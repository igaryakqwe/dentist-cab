import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { User } from 'next-auth';
import { cn } from '@/utils/cn';

interface UserCardProps {
  user: User;
  className?: string;
}

const UserCard = ({ user, className }: UserCardProps) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center gap-2 px-1 py-1.5 text-left text-sm'
      )}
    >
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user.image as string} alt={user.name || 'avatar'} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
};

export default UserCard;
