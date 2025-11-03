import React from 'react';
import type { NormalizedEvent } from '@/types/event';

type Props = { event: NormalizedEvent };

export default function EventCard({ event }: Props) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:border-indigo-400/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-indigo-500/10 transition-all duration-300"></div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
            {event.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.dateLabel}
            </span>
            {event.timeLabel && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.timeLabel}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </span>
            )}
            {event.society && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-md bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                {event.society}
              </span>
            )}
          </div>
        </div>
        {event.rsvpUrl && (
          <a
            href={event.rsvpUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 hover:scale-105 shrink-0 border border-white/20"
          >
            RSVP
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        )}
      </div>
      {event.tags.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-2">
          {event.tags.map((t) => (
            <span key={t} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-indigo-500/10 text-indigo-200 border border-indigo-400/20 hover:border-indigo-400/40 transition-colors">
              {t}
            </span>
          ))}
        </div>
      )}
      {event.description && (
        <p className="relative mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-300 border-t border-white/10 pt-4">
          {event.description}
        </p>
      )}
    </div>
  );
}


