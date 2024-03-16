import { cn } from '@/lib/utils';

import { ChevronUpDownIcon } from '@heroicons/react/16/solid';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
}

export function Select({ className, containerClassName, ...props }: SelectProps) {
  return (
    <div className={cn('relative flex flex-col items-stretch', containerClassName)}>
      <select
        className={cn(
          'h-8 cursor-pointer rounded-lg bg-white bg-none px-2.5 py-0 pr-8 text-xs font-medium transition',
          'border border-black/15',
          'focus-visible:border-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black focus-visible:ring-0',
          className
        )}
        {...props}
      />
      <ChevronUpDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/50" />
    </div>
  );
}
