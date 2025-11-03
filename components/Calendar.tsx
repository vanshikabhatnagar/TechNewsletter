"use client";
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { NormalizedEvent } from '@/types/event';

type Props = { events: NormalizedEvent[] };

export default function CalendarView({ events }: Props) {
  const fcEvents = events.map((e) => ({
    id: e.id,
    title: e.title,
    start: e.start,
    end: e.end,
    url: e.rsvpUrl,
  }));

  return (
    <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-4 sm:p-6 shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
        events={fcEvents}
        height="auto"
        eventColor="#6366f1"
        eventTextColor="#ffffff"
        eventBorderColor="#818cf8"
        eventBackgroundColor="#6366f1"
      />
    </div>
  );
}


