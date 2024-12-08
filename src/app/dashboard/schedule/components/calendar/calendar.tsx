'use client';

import { useEffect, useState } from 'react';
import { CalendarHeader } from './calendar-header';
import { CalendarSidebar } from './calendar-sidebar';
import { WeekView } from './week-view';
import type { CalendarView } from '@/types/calendar';
import { api } from '@/lib/trpc/client';
import useScheduleStore from '@/hooks/filters/use-schedule-store';
import { useQueryState } from 'nuqs';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [search, setSearch] = useQueryState('q');
  const [doctors, setDoctors] = useQueryState<string[]>('doctors', {
    defaultValue: [],
    shallow: true,
    parse: (value) => (value ? JSON.parse(value) : []),
    serialize: (value) => JSON.stringify(value),
  });

  const [view, setView] = useState<CalendarView>('week');
  const { events, setEvents } = useScheduleStore();

  const { data, isLoading } = api.schedule.getEvents.useQuery();

  useEffect(() => {
    if (events && !data) return;
    setEvents(data || []);
  }, [data, events]);

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const handleClickToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="flex h-screen bg-background text-foreground rounded-lg overflow-hidden mr-3">
      <CalendarSidebar
        currentDate={currentDate}
        onDateChange={handleDateChange}
        doctors={doctors}
        setDoctors={setDoctors}
      />
      <div className="flex-1 flex flex-col">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onViewChange={setView}
          onNavigate={handleNavigate}
          onClickToday={handleClickToday}
          search={search}
          setSearch={setSearch}
        />
        <WeekView
          currentDate={currentDate}
          isLoading={isLoading}
          search={search}
          doctors={doctors}
        />
      </div>
    </div>
  );
}
