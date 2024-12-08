import { Calendar } from '@components/ui/calendar';
import DentistFilter from '@/app/dashboard/schedule/components/calendar/dentist-filter';
import { useEffect } from 'react';

interface CalendarSidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  doctors: string[];
  setDoctors: (doctors: string[] | null) => void;
}

export function CalendarSidebar({
  currentDate,
  onDateChange,
  doctors,
  setDoctors,
}: CalendarSidebarProps) {
  useEffect(() => {
    if (doctors.length === 0) {
      setDoctors(null);
    }
  }, [doctors]);

  return (
    <aside className="p-4 space-y-6 bg-background rounded-l-lg">
      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={(date) => date && onDateChange(date)}
        className="rounded-md border"
      />
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2 text-foreground">Фільтр по лікарю</h3>
          <DentistFilter doctors={doctors} setDoctors={setDoctors} />
        </div>
      </div>
    </aside>
  );
}
