"use client";
import React, { useMemo, useState } from 'react';
import type { NormalizedEvent } from '@/types/event';
import Filters from '@/components/Filters';
import EventCard from '@/components/EventCard';

function groupByDay(events: NormalizedEvent[]): Record<string, NormalizedEvent[]> {
  return events.reduce<Record<string, NormalizedEvent[]>>((acc, e) => {
    acc[e.dateLabel] = acc[e.dateLabel] || [];
    acc[e.dateLabel].push(e);
    return acc;
  }, {});
}

export default function EventsClient({ initialEvents }: { initialEvents: NormalizedEvent[] }) {
  const [filtered, setFiltered] = useState<NormalizedEvent[]>(initialEvents);
  const grouped = useMemo(() => groupByDay(filtered), [filtered]);
  const days = useMemo(() => Object.keys(grouped), [grouped]);
  return (
    <div className="flex flex-col gap-6">
      <Filters events={initialEvents} onChange={setFiltered} />
      {days.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-lg">
          <svg className="mx-auto h-12 w-12 text-indigo-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-slate-300">No events match your filters.</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      {days.map((day) => (
        <section key={day} className="mt-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"></div>
            <h2 className="text-xl font-bold text-white bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              {day}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"></div>
          </div>
          <div className="grid gap-4">
            {grouped[day].map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}


