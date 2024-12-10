import PageSkeleton from '@/components/page-skeleton';
import { Heading } from '@components/heading';
import ProfilePage from '@/app/dashboard/profile/components/profile-page';
import PageContainer from '@components/layout/page-container';
import React, { Suspense } from 'react';
import DashboardPage from '@/app/dashboard/components/dashboard-page';

export default async function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContainer scrollable>
        <div className="space-y-4">
          <Heading title="Аналітика" />
          <DashboardPage />
        </div>
      </PageContainer>
    </Suspense>
  );
}
