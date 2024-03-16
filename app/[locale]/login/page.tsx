import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getI18n } from '@/locales/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: t('login.title'),
  };
}

export default async function LoginPage() {
  const t = await getI18n();

  return <main className="relative flex min-h-svh flex-col items-stretch">Login page</main>;
}
