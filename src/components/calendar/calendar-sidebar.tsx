import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import type { CalendarCategory } from '@/types/calendar';

interface CalendarSidebarProps {
  currentDate: Date;
  categories: CalendarCategory[];
  onCategoryToggle: (categoryId: string) => void;
  onDateChange: (date: Date) => void;
}

export function CalendarSidebar({
  currentDate,
  categories,
  onCategoryToggle,
  onDateChange,
}: CalendarSidebarProps) {
  return (
    <aside className="p-4 bg-background rounded-l-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">
            {currentDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={(date) => date && onDateChange(date)}
          className="rounded-md border"
        />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2 text-foreground">My Calendars</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  onCheckedChange={() => onCategoryToggle(category.id)}
                  className="rounded"
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
