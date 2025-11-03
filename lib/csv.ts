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
  const items: EventItem[] = (data || []).map((row, idx) => {
    const tags = (row.tags || row.Tags || '').split(',').map(t => t.trim()).filter(Boolean);
    return {
      id: String(idx + 1),
      title: row.title || row.Title || '',
      date: row.date || row.Date || '',
      startTime: row.startTime || row.StartTime || row.start_time || '',
      endTime: row.endTime || row.EndTime || row.end_time || '',
      location: row.location || row.Location || '',
      society: row.society || row.Society || '',
      tags,
      description: row.description || row.Description || '',
      rsvpUrl: row.rsvpUrl || row.RSVP || row.rsvp || '',
      imageUrl: row.imageUrl || row.ImageUrl || row.image || '',
    };
  });
  return items;
}


