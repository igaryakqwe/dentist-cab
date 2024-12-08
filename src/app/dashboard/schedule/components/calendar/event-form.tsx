import { useEffect, useState } from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { CalendarEvent } from '@/types/calendar';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import DentistSelector from '@/app/dashboard/schedule/components/calendar/dentist-selector';
import PatientSelector from '@/app/dashboard/schedule/components/calendar/patient-selector';
import { calculateEndTime } from '@/utils/date-utils';
import ServiceSelector from '@/app/dashboard/schedule/components/calendar/service-selector';
import { api } from '@/lib/trpc/client';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (id: string) => void;
  defaultDate?: Date;
  event?: CalendarEvent | null;
}

export function EventForm({
  isOpen,
  onClose,
  onSave,
  onDelete,
  defaultDate = new Date(),
  event,
}: EventFormProps) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date>(defaultDate);
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [serviceId, setServiceId] = useState('');

  const { data: services, isLoading } = api.services.getServices.useQuery();

  const selectedService = services?.find((service) => service.id === serviceId);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartDate(event.startDate);
      setServiceId(event.serviceId);
      setDoctorId(event.doctorId);
      setPatientId(event.patientId);
    } else {
      setTitle('');
      const newDate = new Date(defaultDate);
      newDate.setHours(9, 0, 0, 0);
      setStartDate(newDate);
      setServiceId('');
      setDoctorId('');
      setPatientId('');
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && selectedService && doctorId && patientId && serviceId) {
      onSave({
        title,
        startDate,
        endDate: calculateEndTime(startDate, selectedService.duration),
        doctorId,
        patientId,
        serviceId,
      });
      onClose();
    }
  };

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      setStartDate((prevDate) => {
        const newDate = new Date(date);
        newDate.setHours(prevDate.getHours());
        newDate.setMinutes(prevDate.getMinutes());
        return newDate;
      });
    }
  }

  function handleTimeChange(type: 'hour' | 'minute', value: string) {
    setStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (type === 'hour') {
        newDate.setHours(parseInt(value, 10));
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value, 10));
      }
      return newDate;
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {event ? 'Редагувати подію' : 'Додати подію'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-sm">
              Назва
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введіть назву"
              required
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-sm">Дата і час початку</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  {startDate ? (
                    format(startDate, 'dd MMM yyyy HH:mm')
                  ) : (
                    <span>Оберіть дату і час</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="sm:flex">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                  <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                    <ScrollArea className="w-64 sm:w-auto">
                      <div className="flex sm:flex-col p-2">
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <Button
                            key={hour}
                            size="icon"
                            variant={
                              startDate.getHours() === hour
                                ? 'default'
                                : 'ghost'
                            }
                            className="sm:w-full shrink-0 aspect-square"
                            onClick={() =>
                              handleTimeChange('hour', hour.toString())
                            }
                          >
                            {hour}
                          </Button>
                        ))}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="sm:hidden"
                      />
                    </ScrollArea>
                    <ScrollArea className="w-64 sm:w-auto">
                      <div className="flex sm:flex-col p-2">
                        {Array.from({ length: 12 }, (_, i) => i * 5).map(
                          (minute) => (
                            <Button
                              key={minute}
                              size="icon"
                              variant={
                                startDate.getMinutes() === minute
                                  ? 'default'
                                  : 'ghost'
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() =>
                                handleTimeChange('minute', minute.toString())
                              }
                            >
                              {minute.toString().padStart(2, '0')}
                            </Button>
                          )
                        )}
                      </div>
                      <ScrollBar
                        orientation="horizontal"
                        className="sm:hidden"
                      />
                    </ScrollArea>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {services && (
            <div className="space-y-1">
              <Label className="text-sm">Послуга</Label>
              <ServiceSelector
                services={services}
                isLoading={isLoading}
                selectedValue={serviceId}
                setSelectedValue={setServiceId}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-sm">Лікар</Label>
            <DentistSelector
              selectedValue={doctorId}
              setSelectedValue={setDoctorId}
            />
          </div>
          <div>
            <Label className="text-sm">Пацієнт</Label>
            <PatientSelector
              selectedValue={patientId}
              setSelectedValue={setPatientId}
            />
          </div>
          <div
            className={cn(
              `flex w-full`,
              event ? 'justify-between' : 'justify-end'
            )}
          >
            {event && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => onDelete && onDelete(event.id)}
                className="h-8 text-sm"
              >
                Видалити
              </Button>
            )}

            <div className="flex self-end justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-8 text-sm"
              >
                Скасувати
              </Button>
              <Button type="submit" className="h-8 text-sm">
                Зберегти
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
