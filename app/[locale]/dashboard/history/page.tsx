import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getI18n } from '@/locales/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { RefreshButton } from '@/components/refresh-button';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: t('history.title'),
  };
}

export const dynamic = 'force-dynamic';

interface HistoryPageProps {
  searchParams: {
    sortBy?: 'date' | 'originality' | 'name';
    sortOrder?: 'asc' | 'desc';
    search?: string;
  };
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const t = await getI18n();
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  let { sortBy, sortOrder, search } = searchParams;

  sortBy ??= 'date';
  sortOrder ??= 'desc';

  const documents = await prisma.document.findMany({
    where: search
      ? {
          AND: [
            {
              userId: session.user.id,
              OR: [{ name: { contains: search, mode: 'insensitive' } }],
            },
          ],
        }
      : { userId: session.user.id },
    orderBy: (sortBy === 'date' && { addedAt: sortOrder }) ||
      (sortBy === 'originality' && { originality: sortOrder }) || { name: sortOrder },
  });

  return (
    <div className="flex w-full max-w-2xl flex-col items-stretch gap-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold">{t('dashboard.history')}</h1>
        <RefreshButton />
      </div>

      <div className="flex flex-row items-center gap-4">
        <Search placeholder={t('search')} className="flex-1" />
        <Sort name="sortBy" id="sortBy" defaultValue={searchParams.sortBy ?? 'date'}>
          <option value="date">{t('history.sort_by_date')}</option>
          <option value="originality">{t('history.sort_by_originality')}</option>
          <option value="name">{t('history.sort_by_name')}</option>
        </Sort>
        <Sort name="sortOrder" id="sortOrder" defaultValue={searchParams.sortOrder ?? 'desc'}>
          <option value="asc">{t('history.sort_order_ascending')}</option>
          <option value="desc">{t('history.sort_order_descending')}</option>
        </Sort>
      </div>

      <ul className="flex flex-col items-stretch divide-y divide-black/10">
        {documents.map((document) => (
          <li key={document.id} className="flex flex-row">
            <Link
              href={`history/${document.id}`}
              className="group flex flex-1 flex-row items-center gap-4 py-4"
            >
              <div className="flex flex-1 flex-col gap-1">
                <div className="text-xs font-medium">{document.name}</div>
                <div className="text-xs font-medium text-black/50">
                  {document.addedAt.toLocaleString()}
                </div>
              </div>
              {document.originality ? (
                <div className="text-base font-semibold">{document.originality}%</div>
              ) : (
                <div className="text-2xs animate-pulse font-medium text-black/50">
                  {t('checking')}
                </div>
              )}
              <ChevronRightIcon className="h-4 w-4 text-black/50 transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
