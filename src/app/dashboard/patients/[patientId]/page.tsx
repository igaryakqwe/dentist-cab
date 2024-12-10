import { trpc } from '@/lib/trpc/server';
import PatientPage from '@/app/dashboard/patients/components/patient-page';
import { Heading } from '@components/heading';
import ProfilePage from '@/app/dashboard/profile/components/profile-page';
import PageContainer from '@components/layout/page-container';
import React from 'react';

interface PatientProps {
  params: {
    patientId: string;
  };
}

const Patient = async ({ params }: PatientProps) => {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Heading title="Інформація про пацієнта" />
        <PatientPage id={params.patientId} />
      </div>
    </PageContainer>
  );
};

export default Patient;
