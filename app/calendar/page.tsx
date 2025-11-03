import React from 'react';
import type { NormalizedEvent } from '@/types/event';
import CalendarView from '@/components/Calendar';
import { fetchCsvText, parseEventsCsv } from '@/lib/csv';
import { normalizeEvents } from '@/lib/normalizeEvent';

async function getEvents(): Promise<NormalizedEvent[]> {
  const csvUrl = process.env.PUBLIC_EVENTS_CSV_URL;
  if (!csvUrl) return [];
  const csv = await fetchCsvText(csvUrl);
  const rows = parseEventsCsv(csv);
  return normalizeEvents(rows);
}

export default async function CalendarPage() {
  const events = await getEvents();
  return (
    <main className="mx-auto max-w-5xl">
      <header className="mb-8">
        <div className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
            Events Calendar
          </h1>
          <p className="text-lg font-semibold text-slate-300">Interactive calendar view</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-sm text-slate-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Click an event to open its RSVP link</span>
        </div>
      </header>
      <CalendarView events={events} />
    </main>
  );
}


