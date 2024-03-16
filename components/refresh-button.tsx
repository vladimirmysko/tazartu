'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/locales/client';
import { cn } from '@/lib/utils';

import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { Button } from '@/components/ui/button';

interface RefreshButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Button>,
    'onClick' | 'children' | 'size' | 'variant' | 'disabled'
  > {}

export function RefreshButton({ className, ...props }: RefreshButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useI18n();

  return (
    <Button
      size="sm"
      variant="secondary"
      className={cn('pl-2.5', className)}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          router.refresh();
        });
      }}
      {...props}
    >
      <ArrowPathIcon className="h-4 w-4 text-black/50" />
      <span>{isPending ? t('history.refreshing') : t('history.refresh')}</span>
    </Button>
  );
}
