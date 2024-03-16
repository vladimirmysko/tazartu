import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getI18n } from '@/locales/server';

import { Header } from '@/components/header';
import { Logo } from '@/components/logo';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { LoginForm } from '@/components/forms/login-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: t('login.title'),
  };
}

export default async function LoginPage() {
  const t = await getI18n();

  return (
    <main className="relative flex min-h-svh flex-col items-stretch">
      <Header className="justify-between ">
        <Logo />
        <LocaleSwitcher />
      </Header>
      <div className="flex flex-col items-center py-20">
        <LoginForm className="w-full max-w-sm" />
      </div>
    </main>
  );
}
