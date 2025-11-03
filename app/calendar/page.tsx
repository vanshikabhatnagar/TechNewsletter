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
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Events Calendar</h1>
        <p className="text-sm text-slate-600">Click an event to open its RSVP link.</p>
      </header>
      <CalendarView events={events} />
    </main>
  );
}


