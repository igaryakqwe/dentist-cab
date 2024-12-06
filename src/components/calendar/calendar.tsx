'use client';

import { useState } from 'react';
import { CalendarHeader } from './calendar-header';
import { CalendarSidebar } from './calendar-sidebar';
import { WeekView } from './week-view';
import type {
  CalendarEvent,
  CalendarView,
  CalendarCategory,
} from '@/types/calendar';

const categories: CalendarCategory[] = [
  { id: '1', name: 'Work', color: 'bg-blue-500' },
  { id: '2', name: 'Personal', color: 'bg-green-500' },
  { id: '3', name: 'Education', color: 'bg-yellow-500' },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('week');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(
        currentDate.getMonth() + (direction === 'next' ? 1 : -1)
      );
    }
    setCurrentDate(newDate);
  };

  const handleEventAdd = (newEvent: Omit<CalendarEvent, 'id'>) => {
    setEvents([
      ...events,
      { ...newEvent, id: Math.random().toString(36).substr(2, 9) },
    ]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="flex h-screen bg-background text-foreground rounded-lg overflow-hidden mr-3">
      <CalendarSidebar
        currentDate={currentDate}
        categories={categories}
        onCategoryToggle={() => {}}
        onDateChange={handleDateChange}
      />
      <div className="flex-1 flex flex-col">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onViewChange={setView}
          onNavigate={handleNavigate}
        />
        <WeekView
          events={events}
          currentDate={currentDate}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
        />
      </div>
    </div>
  );
}
