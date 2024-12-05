'use client';

import { cn } from '@/utils/cn';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SwitchButton = () => {
  const pathname = usePathname();

  const isLogin = pathname.includes('sign-in');
  const href = isLogin ? '/sign-up' : '/sign-in';
  const text = isLogin ? 'Sign Up' : 'Login';

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'default' }),
        'absolute right-4 top-4 font-semibold md:right-8 md:top-8'
      )}
    >
      {text}
    </Link>
  );
};

export default SwitchButton;
