'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { data } from '@/constants/nav';
import UserDropdown from '@components/user-dropdown';

export function UserNav() {
  return (
    <UserDropdown>
      <div className="flex cursor-pointer items-center gap-2 px-0.5 py-0.5 text-left text-sm">
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src={data.user.avatar} alt={data.user.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </div>
    </UserDropdown>
  );
}
