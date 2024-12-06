export type CalendarEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
  category: 'work' | 'personal' | 'education';
  color?: string;
};

export type CalendarCategory = {
  id: string;
  name: string;
  color: string;
};

export type CalendarView = 'day' | 'week' | 'month';
