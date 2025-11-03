import { format, isValid, parse } from 'date-fns';
import type { EventItem, NormalizedEvent } from '@/types/event';

function parseDateFlexible(dateStr: string): Date | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  const iso = new Date(trimmed);
  if (isValid(iso)) return iso;
  const dmy = parse(trimmed, 'dd/MM/yyyy', new Date());
  if (isValid(dmy)) return dmy;
  const mdy = parse(trimmed, 'MM/dd/yyyy', new Date());
  if (isValid(mdy)) return mdy;
  return null;
}

function combineDateAndTime(date: Date, time?: string): Date {
  if (!time) return date;
  const trimmed = time.trim();
  // Ignore dashes or invalid placeholders
  if (!trimmed || /^[-–—]+$/.test(trimmed)) return date;
  // Accept HH:MM (24h) only; otherwise ignore time
  if (!/^\d{1,2}:\d{2}$/.test(trimmed)) return date;
  const [hhStr, mmStr] = trimmed.split(':');
  const hours = Number(hhStr);
  const minutes = Number(mmStr);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return date;
  const dt = new Date(date);
  dt.setHours(hours);
  dt.setMinutes(minutes);
  dt.setSeconds(0, 0);
  return dt;
}

export function normalizeEvents(items: EventItem[]): NormalizedEvent[] {
  const normalized: NormalizedEvent[] = [];
  for (const item of items) {
    const parsedDate = parseDateFlexible(item.date);
    if (!item.title || !parsedDate) continue;

    const start = combineDateAndTime(parsedDate, item.startTime);
    const endCandidate = item.endTime ? combineDateAndTime(parsedDate, item.endTime) : undefined;
    const end = endCandidate && endCandidate > start ? endCandidate : undefined;

    const dateLabel = format(start, 'dd MMM yyyy');
    let timeLabel: string | undefined;
    if (item.startTime && item.endTime) {
      timeLabel = `${item.startTime}–${item.endTime}`;
    } else if (item.startTime) {
      timeLabel = item.startTime;
    }

    normalized.push({
      id: item.id,
      title: item.title.trim(),
      start: start.toISOString(),
      end: end?.toISOString(),
      dateLabel,
      timeLabel,
      location: item.location?.trim() || undefined,
      society: item.society?.trim() || undefined,
      tags: (item.tags || []).map(t => t.trim().toLowerCase()).filter(Boolean),
      description: item.description?.trim() || undefined,
      rsvpUrl: item.rsvpUrl?.trim() || undefined,
      imageUrl: item.imageUrl?.trim() || undefined,
    });
  }

  normalized.sort((a, b) => a.start.localeCompare(b.start));
  return normalized;
}


