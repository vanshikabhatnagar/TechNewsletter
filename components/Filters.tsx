"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { NormalizedEvent } from '@/types/event';

type Props = { events: NormalizedEvent[]; onChange: (filtered: NormalizedEvent[]) => void };

export default function Filters({ events, onChange }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [society, setSociety] = useState(searchParams.get('society') ?? '');
  const [tag, setTag] = useState(searchParams.get('tag') ?? '');
  const [location, setLocation] = useState(searchParams.get('location') ?? '');

  const societies = useMemo(
    () => Array.from(new Set(events.map(e => e.society).filter(Boolean))) as string[],
    [events]
  );
  const tags = useMemo(
    () => Array.from(new Set(events.flatMap(e => e.tags))).sort(),
    [events]
  );

  useEffect(() => {
    const filtered = events.filter((e) => {
      const matchesQuery = query
        ? (e.title + ' ' + (e.description || '')).toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesSociety = society ? e.society === society : true;
      const matchesTag = tag ? e.tags.includes(tag.toLowerCase()) : true;
      const matchesLocation = location ? (e.location || '').toLowerCase().includes(location.toLowerCase()) : true;
      return matchesQuery && matchesSociety && matchesTag && matchesLocation;
    });
    onChange(filtered);
  }, [events, query, society, tag, location, onChange]);

  function updateUrl() {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (society) params.set('society', society);
    if (tag) params.set('tag', tag);
    if (location) params.set('location', location);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  useEffect(() => {
    updateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, society, tag, location]);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <h2 className="text-sm font-semibold text-slate-200">Filter Events</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/10 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm text-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/10 transition-all cursor-pointer"
          value={society}
          onChange={(e) => setSociety(e.target.value)}
        >
          <option value="" className="bg-slate-800">All societies</option>
          {societies.map((s) => (
            <option key={s} value={s} className="bg-slate-800">{s}</option>
          ))}
        </select>
        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm text-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/10 transition-all cursor-pointer"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="" className="bg-slate-800">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t} className="bg-slate-800">{t}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filter by location"
          className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/10 transition-all"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </div>
  );
}


