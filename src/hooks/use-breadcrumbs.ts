'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

const dashboardBreadcrumbs: BreadcrumbItem = {
  title: 'Головна',
  link: '/dashboard',
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [dashboardBreadcrumbs],
  '/dashboard/employees': [
    dashboardBreadcrumbs,
    { title: 'Працівники', link: '/dashboard/employees' },
  ],
  '/dashboard/services': [
    dashboardBreadcrumbs,
    { title: 'Сервіси', link: '/dashboard/product' },
  ],
  '/dashboard/patients': [
    dashboardBreadcrumbs,
    { title: 'Пацієнти', link: '/dashboard/patients' },
  ],
  '/dashboard/schedule': [
    dashboardBreadcrumbs,
    { title: 'Розклад', link: '/dashboard/schedule' },
  ],
  '/dashboard/profile': [
    dashboardBreadcrumbs,
    { title: 'Аккаунт', link: '/dashboard/profile' },
  ],
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
