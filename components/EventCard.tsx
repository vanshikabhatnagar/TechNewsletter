import React from 'react';
import type { NormalizedEvent } from '@/types/event';

type Props = { event: NormalizedEvent };

export default function EventCard({ event }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
          <p className="text-sm text-slate-600">
            {event.dateLabel}
            {event.timeLabel ? ` · ${event.timeLabel}` : ''}
            {event.location ? ` · ${event.location}` : ''}
            {event.society ? ` · ${event.society}` : ''}
          </p>
        </div>
        {event.rsvpUrl && (
          <a
            href={event.rsvpUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            RSVP
          </a>
        )}
      </div>
      {event.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {event.tags.map((t) => (
            <span key={t} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
              {t}
            </span>
          ))}
        </div>
      )}
      {event.description && (
        <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{event.description}</p>
      )}
    </div>
  );
}


