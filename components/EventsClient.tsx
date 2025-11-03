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
    <div className="flex flex-col gap-4">
      <Filters events={initialEvents} onChange={setFiltered} />
      {days.length === 0 && (
        <p className="text-sm text-slate-600">No events match your filters.</p>
      )}
      {days.map((day) => (
        <section key={day} className="mt-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">{day}</h2>
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


