'use client';

import ProfileCard from './profile-card';
import ProfileCompletionBar from '@/app/dashboard/profile/components/profile-completion-bar';
import CompleteProfileForm from '@/app/dashboard/profile/components/complete-profile-form';

export default function ProfilePage() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-[1fr_2fr]">
      <ProfileCard />
      <CompleteProfileForm />
      <ProfileCompletionBar />
    </div>
  );
}
