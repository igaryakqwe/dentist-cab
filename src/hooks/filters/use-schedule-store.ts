import { CalendarEvent } from '@/types/calendar';
import { create } from 'zustand';

export interface ScheduleFilters {
  search: string;
  doctors: string[];
}

interface IUseScheduleStore {
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (eventId: string) => void;
}

const useScheduleStore = create<IUseScheduleStore>((set) => ({
  events: [],
  filters: {
    search: '',
    doctors: [],
  },
  filteredEvents: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({ events: [...state.events, newEvent] }));
  },
  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
  deleteEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== eventId),
    })),
}));

export default useScheduleStore;
