import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@components/ui/button';
import type { CalendarEvent } from '@/types/calendar';
import { EventForm } from './event-form';
import { getTime } from '@/utils/date-utils';
import { api } from '@/lib/trpc/client';
import { useToast } from '@/hooks/use-toast';
import useScheduleStore from '@/hooks/filters/use-schedule-store';
import { Loader } from './loader';
import { filterEvents } from '@/utils/filter-utils';
import { useSearchParams } from 'next/navigation';

interface WeekViewProps {
  currentDate: Date;
  isLoading: boolean;
  search: string | null;
  doctors: string[];
}

export function WeekView({
  currentDate,
  isLoading,
  search,
  doctors,
}: WeekViewProps) {
  const { toast } = useToast();

  const filters = { search, doctors: doctors || [] };

  const { events, updateEvent, addEvent, deleteEvent } = useScheduleStore();

  const filteredEvents = filterEvents(events || [], filters);

  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const addEventMutation = api.schedule.addEvent.useMutation();
  const updateEventMutation = api.schedule.updateEvent.useMutation();
  const deleteEventMutation = api.schedule.deleteEvent.useMutation();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDate.getDay() + i);
    return date;
  });

  const today = new Date();

  const getEventStyle = (event: CalendarEvent) => {
    const startHour = event.startDate.getHours();
    const startMinute = event.startDate.getMinutes();
    const endHour = event.endDate.getHours();
    const endMinute = event.endDate.getMinutes();

    const top = (startHour + startMinute / 60) * 40;
    const height =
      (endHour + endMinute / 60 - (startHour + startMinute / 60)) * 40;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  const handleCellClick = (date: Date, hour: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour);
    setSelectedDate(newDate);
    setSelectedEvent(null);
    setIsEventFormOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  };

  const handleEventSave = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (selectedEvent) {
      updateEventMutation.mutate(
        { ...eventData, id: selectedEvent.id },
        {
          onSuccess: () => {
            updateEvent({ ...eventData, id: selectedEvent.id });
            toast({
              title: 'Подію успішно оновлено',
            });
            window.location.reload();
          },
          onError: (error) => {
            toast({
              title: 'Помилка',
              description: error.message,
              variant: 'destructive',
            });
          },
        }
      );
    } else {
      addEventMutation.mutate(eventData, {
        onSuccess: () => {
          addEvent(eventData);
          toast({
            title: 'Подію успішно додано',
          });
          window.location.reload();
        },
        onError: (error) => {
          toast({
            title: 'Помилка',
            description: error.message,
            variant: 'destructive',
          });
        },
      });
    }
    setIsEventFormOpen(false);
    setSelectedEvent(null);
  };

  const handleEventDelete = (eventId: string) => {
    if (!selectedEvent) return;
    deleteEventMutation.mutate(
      { id: selectedEvent.id },
      {
        onSuccess: () => {
          deleteEvent(eventId);
          toast({
            title: 'Подію успішно видалено',
          });
          window.location.reload();
        },
        onError: (error) => {
          toast({
            title: 'Помилка',
            description: error.message,
            variant: 'destructive',
          });
        },
      }
    );
    setIsEventFormOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="flex-1 relative max-h-[85vh] border overflow-auto rounded-[6px] bg-background">
      <div className="relative grid grid-rows-1 border-b grid-cols-[auto_repeat(7,1fr)]">
        <div className="w-12" />
        {days.map((date) => (
          <div
            key={date.toISOString()}
            className="px-1 py-2 flex flex-col justify-center items-center border-l"
          >
            <div className="font-semibold text-foreground text-xs">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div
              className={`text-xs w-fit py-1 rounded-[6px] px-1.5 text-muted-foreground ${today.getDate() === date.getDate() ? 'bg-primary text-white' : ''}`}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
      <div className="relative grid grid-cols-[auto_repeat(7,1fr)]">
        <div className="w-12">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[40px] grid place-items-center border-b text-[10px] text-muted-foreground text-right"
            >
              {`${hour.toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>
        {days.map((date) => (
          <div key={date.toISOString()} className="relative border-l">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[40px] border-b"
                onClick={() => handleCellClick(date, hour)}
              />
            ))}
            {filteredEvents
              .filter(
                (event) =>
                  event.startDate.toDateString() === date.toDateString()
              )
              .map((event) => (
                <div
                  key={event.id}
                  className="absolute left-0 right-0 mx-0.5 p-1 rounded-sm bg-primary/10 text-[10px] overflow-hidden cursor-pointer hover:bg-primary/20"
                  style={getEventStyle(event)}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="font-medium text-primary truncate">
                    {event.title}
                  </div>
                  <div className="text-muted-foreground truncate">{`${getTime(event.startDate)} - ${getTime(event.endDate)}`}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
      {isLoading && <Loader />}
      <EventForm
        isOpen={isEventFormOpen}
        onClose={() => {
          setIsEventFormOpen(false);
          setSelectedEvent(null);
        }}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        defaultDate={selectedDate}
        event={selectedEvent}
      />
    </div>
  );
}
