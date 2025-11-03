import { NextResponse } from 'next/server';
import { fetchCsvText, parseEventsCsv } from '@/lib/csv';
import { normalizeEvents } from '@/lib/normalizeEvent';

export const revalidate = 300; // ISR-like cache for server environments

export async function GET() {
  try {
    const csvUrl = process.env.PUBLIC_EVENTS_CSV_URL;
    if (!csvUrl) {
      return NextResponse.json({ error: 'Missing PUBLIC_EVENTS_CSV_URL' }, { status: 500 });
    }

    const csv = await fetchCsvText(csvUrl);
    const rows = parseEventsCsv(csv);
    const events = normalizeEvents(rows);

    const res = NextResponse.json({ events });
    res.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=300');
    return res;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


