import { cn } from '@/lib/utils';

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export function FileInput({ className, ...props }: FileInputProps) {
  return (
    <input
      className={cn(
        'h-10 cursor-pointer rounded-lg border border-dashed border-black/20 bg-white px-3 text-xs text-black/60 transition-colors focus:outline-none active:bg-black/5',
        'focus-visible:border-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black focus-visible:ring-0',
        'file:mr-4 file:mt-2.5 file:cursor-pointer file:border-0 file:bg-transparent file:p-0 file:text-xs file:font-medium file:focus-visible:ring-offset-0',
        className
      )}
      type="file"
      {...props}
    />
  );
}
