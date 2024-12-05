import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import PageSkeleton from '@/components/page-skeleton';
import Header from '@/components/header';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  console.log(session?.user);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <PageSkeleton />
      </SidebarInset>
    </SidebarProvider>
  );
}
