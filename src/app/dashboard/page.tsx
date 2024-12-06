import PageSkeleton from '@/components/page-skeleton';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  console.log(session?.user);

  return <PageSkeleton />;
}
