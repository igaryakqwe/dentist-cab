import { CalendarCheck, CircleUser, Dock, Users } from 'lucide-react';

export const data = {
  projects: [
    {
      title: 'Працівники',
      url: '/dashboard/employees',
      icon: Users,
    },
    {
      title: 'Послуги',
      url: '/dashboard/services',
      icon: Dock,
    },
    {
      title: 'Пацієнти',
      url: '#',
      icon: CircleUser,
    },
    {
      title: 'Розклад',
      url: '/dashboard/schedule',
      icon: CalendarCheck,
    },
  ],
};
