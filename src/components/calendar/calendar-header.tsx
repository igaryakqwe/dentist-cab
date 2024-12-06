import {
  Search,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface CalendarHeaderProps {
  currentDate: Date;
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onNavigate,
}: CalendarHeaderProps) {
  return (
    <header className="flex items-center justify-between px-2 pb-2 bg-background rounded-tr-lg">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-foreground">Календар</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('prev')}
          className="h-7 w-7 p-0"
        >
          <ChevronLeft />
        </Button>
        <h2 className="text-sm font-medium text-foreground px-2">
          {currentDate.toLocaleString('default', {
            month: 'short',
            year: 'numeric',
          })}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('next')}
          className="h-7 w-7 p-0"
        >
          <ChevronRight />
        </Button>
        <Button variant="secondary" size="sm" className="text-xs">
          Сьогодні
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-40">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input placeholder="Пошук" className="pl-7 h-7 text-xs" />
        </div>
        <ToggleGroup
          type="single"
          size="sm"
          value={view}
          onValueChange={(v) => onViewChange(v as any)}
        >
          <ToggleGroupItem value="day" className="text-xs">
            D
          </ToggleGroupItem>
          <ToggleGroupItem value="week" className="text-xs">
            W
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </header>
  );
}
