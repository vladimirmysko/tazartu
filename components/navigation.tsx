import { getI18n } from '@/locales/server';
import { cn } from '@/lib/utils';

import { NavigationLink } from '@/components/navigation-link';

interface NavigationProps extends React.HTMLAttributes<HTMLElement> {}

export async function Navigation({ className, ...props }: NavigationProps) {
  const t = await getI18n();

  const links = [
    {
      href: '/dashboard/file-upload',
      label: t('dashboard.file_upload'),
    },
    {
      href: '/dashboard/history',
      label: t('dashboard.history'),
    },
  ];

  return (
    <nav className={cn('flex flex-col items-stretch', className)} {...props}>
      <ul className="flex flex-row items-baseline gap-5">
        {links.map((link) => (
          <li className="flex" key={link.href}>
            <NavigationLink href={link.href}>{link.label}</NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
