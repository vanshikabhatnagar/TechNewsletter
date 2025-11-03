import React, { Suspense } from 'react';
import EventsClient from '@/components/EventsClient';
import type { NormalizedEvent } from '@/types/event';
import { fetchCsvText, parseEventsCsv } from '@/lib/csv';
import { normalizeEvents } from '@/lib/normalizeEvent';

async function getEvents(): Promise<NormalizedEvent[]> {
  const csvUrl = process.env.PUBLIC_EVENTS_CSV_URL;
  if (!csvUrl) return [];
  const csv = await fetchCsvText(csvUrl);
  const rows = parseEventsCsv(csv);
  return normalizeEvents(rows);
}

export default async function Home() {
  const events = await getEvents();
  return (
    <main className="mx-auto max-w-5xl">
      <header className="mb-8">
        <div className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
            Tech Events & Innovation
          </h1>
          <p className="text-lg font-semibold text-slate-300">Technology, AI & Innovation OBN Newsletter</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-sm text-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
          </span>
          <span>Live updates</span>
        </div>
      </header>

      <Suspense fallback={
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-lg">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white/20 border-r-indigo-400"></div>
          <p className="mt-4 text-sm font-medium text-slate-300">Loading events...</p>
        </div>
      }>
        <EventsClient initialEvents={events} />
      </Suspense>
    </main>
  );
}
