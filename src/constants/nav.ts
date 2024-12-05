import { CalendarCheck, CircleUser, Dock, Users } from 'lucide-react';

export const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  projects: [
    {
      title: 'Працівники',
      url: '#',
      icon: Users,
      isActive: false,
      items: [],
    },
    {
      title: 'Послуги',
      url: '#',
      icon: Dock,
    },
    {
      title: 'Пацієнти',
      url: '#',
      icon: CircleUser,
    },
    {
      title: 'Розклад',
      url: '#',
      icon: CalendarCheck,
    },
  ],
};
