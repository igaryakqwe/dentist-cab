import { Card, CardContent } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { CalendarFold, Dna, Mail } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { User } from 'next-auth';
import { FC } from 'react';

interface ProfileCardProps {
  user: User;
  className?: string;
}

const ProfileCard: FC<ProfileCardProps> = ({ user, className }) => {
  const fallback = user?.name ? user.name[0] : user?.email?.at(0) || 'No image';
  const fullName = user?.name
    ? user.surname
      ? `${user.name} ${user.surname}`
      : user.name
    : '--';

  const role = user?.role === 'USER' ? 'Пацієнт' : 'Лікар';
  const birthDate = user?.birthDate
    ? format(new Date(user?.birthDate as unknown as string), 'dd.MM.yyyy')
    : 'Не вказано';

  const gender = user?.gender === 'MALE' ? 'Чоловік' : 'Жінка';

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.image as string}
                alt={user?.email as string}
              />
              <AvatarFallback>{fallback?.toUpperCase()}</AvatarFallback>
            </Avatar>

            <Badge
              className="absolute hover:bg-primary cursor-default -top-2 -right-2"
              variant="default"
            >
              {role}
            </Badge>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold">{fullName}</h2>
            {user?.position && (
              <p className="text-muted-foreground">{user.position}</p>
            )}
          </div>

          <div className="w-full space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarFold className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{birthDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Dna className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{gender}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
