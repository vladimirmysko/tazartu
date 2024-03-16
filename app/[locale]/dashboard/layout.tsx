import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Logo } from '@/components/logo';
import { Navigation } from '@/components/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="relative flex min-h-svh flex-col items-stretch">
      <Header className="gap-10">
        <div className="flex flex-1 flex-row items-baseline gap-10">
          <Logo />
          <Navigation />
        </div>
        <Link href="/dashboard/profile" className="text-xs font-medium">
          {session.user.username}
        </Link>
      </Header>
      <div className="flex flex-1 flex-col items-center px-4 py-20">{children}</div>
    </main>
  );
}
