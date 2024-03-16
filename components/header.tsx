import { cn } from '@/lib/utils';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn('sticky flex h-16 flex-row items-center bg-white px-4 sm:px-6', className)}
      {...props}
    ></header>
  );
}
