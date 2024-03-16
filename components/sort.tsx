'use client';

import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

import { Select } from '@/components/ui/select';

interface SortProps extends Omit<React.ComponentPropsWithoutRef<typeof Select>, 'onChange'> {}

export function Sort({ className, name = 'sort', ...props }: SortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Select
      className={cn('', className)}
      name={name}
      id={name}
      onChange={(e) => router.push(pathname + '?' + createQueryString(name, e.target.value))}
      {...props}
    />
  );
}
