import { Heading } from '@components/heading';
import PageContainer from '@components/layout/page-container';
import React from 'react';
import ServicesTableContent from '@/app/dashboard/services/components/services-table-content';

const DashboardServices = async () => {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Heading title="Послуги" />
        <ServicesTableContent />
      </div>
    </PageContainer>
  );
};

export default DashboardServices;
