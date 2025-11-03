export type EventItem = {
  id: string;
  title: string;
  date: string; // original date string from CSV
  startTime?: string;
  endTime?: string;
  startDateTime?: string; // ISO string if computed
  endDateTime?: string; // ISO string if computed
  location?: string;
  society?: string;
  tags: string[];
  description?: string;
  rsvpUrl?: string;
  imageUrl?: string;
};

export type NormalizedEvent = Required<Pick<EventItem, 'id' | 'title'>> & {
  start: string; // ISO
  end?: string; // ISO
  dateLabel: string; // e.g., 03 Nov 2025
  timeLabel?: string; // e.g., 18:00–19:30
  location?: string;
  society?: string;
  tags: string[];
  description?: string;
  rsvpUrl?: string;
  imageUrl?: string;
};


