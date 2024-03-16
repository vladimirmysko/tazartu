import { cn } from '@/lib/utils';

interface LogoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <div
      className={cn(
        'font-display text-base font-semibold leading-none tracking-[-0.01em]',
        className
      )}
      {...props}
    >
      tazartu.
    </div>
  );
}
