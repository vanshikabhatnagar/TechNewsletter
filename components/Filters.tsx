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
    <div className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          placeholder="Search title or description"
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          value={society}
          onChange={(e) => setSociety(e.target.value)}
        >
          <option value="">All societies</option>
          {societies.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filter by location"
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </div>
  );
}


