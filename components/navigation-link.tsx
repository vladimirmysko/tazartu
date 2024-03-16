'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {}

export function NavigationLink({ href, ...props }: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(href.toString());

  return (
    <Link
      className={cn(
        'rounded text-xs font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
        isActive ? 'text-black' : 'text-black/50 hover:text-black'
      )}
      href={href}
      {...props}
    />
  );
}
