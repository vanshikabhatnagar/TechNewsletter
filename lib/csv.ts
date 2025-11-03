import Papa from 'papaparse';
import type { EventItem } from '@/types/event';

export async function fetchCsvText(csvUrl: string): Promise<string> {
  const res = await fetch(csvUrl, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

export function parseEventsCsv(csvText: string): EventItem[] {
  const { data, errors } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: 'greedy',
  });
  if (errors && errors.length > 0) {
    // Non-fatal: keep parsing even if some rows have issues
    // eslint-disable-next-line no-console
    console.warn('CSV parse errors:', errors.slice(0, 3));
  }
  function clean(val?: string): string {
    if (!val) return '';
    const v = String(val).trim();
    // Treat various dashes or placeholders as empty
    if (v === '-' || v === '–' || v === '—' || v.toLowerCase() === 'na' || v.toLowerCase() === 'n/a') return '';
    return v;
  }

  const items: EventItem[] = (data || []).map((row, idx) => {
    const tags = (row.tags || row.Tags || '').split(',').map(t => t.trim()).filter(Boolean);
    return {
      id: String(idx + 1),
      title: clean(row.title || row.Title),
      date: clean(row.date || row.Date),
      startTime: clean(row.startTime || row.StartTime || row.start_time),
      endTime: clean(row.endTime || row.EndTime || row.end_time),
      location: clean(row.location || row.Location),
      society: clean(row.society || row.Society),
      tags,
      description: clean(row.description || row.Description),
      rsvpUrl: clean(row.rsvpUrl || row.RSVP || row.rsvp),
      imageUrl: clean(row.imageUrl || row.ImageUrl || row.image),
    };
  });
  return items;
}


