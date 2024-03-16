'use client';

import { useCallback, useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {}

export function Search({ className, ...props }: SearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const isSearching = timeoutId || isPending;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);

    const id = setTimeout(() => {
      startTransition(() => {
        if (event.target.value) {
          router.push(pathname + '?' + createQueryString('search', event.target.value));
        } else {
          router.push(pathname + '?' + createQueryString('search', ''));
        }

        setTimeoutId(undefined);
      });
    }, 500);

    setTimeoutId(id);
  };

  return (
    <input
      className={cn(
        'h-8 rounded-lg border-0 bg-black/5 px-2.5 py-0 text-sm transition placeholder:text-black/50',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black focus-visible:ring-0',
        className
      )}
      type="search"
      onChange={onSearch}
      {...props}
    />
  );
}
