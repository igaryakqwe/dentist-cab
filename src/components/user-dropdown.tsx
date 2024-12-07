import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useSidebar } from '@components/ui/sidebar';
import { BadgeCheck, Bell, LogOut } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { signOut, useSession } from 'next-auth/react';
import UserCard from '@components/user-card';

const UserDropdown = ({ children }: PropsWithChildren) => {
  const session = useSession();
  const user = session?.data?.user;

  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <UserCard user={user} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
