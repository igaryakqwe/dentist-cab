import { Heading } from '@components/heading';
import PageContainer from '@components/layout/page-container';
import React from 'react';
import ProfilePage from '@/app/dashboard/profile/components/profile-page';

const DashboardServices = async () => {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Heading title="Профіль" />
        <ProfilePage />
      </div>
    </PageContainer>
  );
};

export default DashboardServices;
