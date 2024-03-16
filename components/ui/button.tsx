'use client';

import { useFormStatus } from 'react-dom';
import { useI18n } from '@/locales/client';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText?: string;
  size?: 'md' | 'sm';
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({
  children,
  className,
  disabled,
  loadingText,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  const t = useI18n();

  if (!loadingText) {
    loadingText = t('loading');
  }

  return (
    <button
      className={cn(
        'flex flex-row items-center justify-center gap-2 rounded-lg px-3 font-medium transition-colors',
        'focus-visible:border-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black focus-visible:ring-0',
        'disabled:border-black/10 disabled:bg-black/10 disabled:text-black/50',
        size === 'md' && 'h-10 text-base',
        size === 'sm' && 'h-8 text-xs',
        variant === 'primary' && 'bg-black text-white active:bg-black/80',
        variant === 'secondary' && 'border border-black/15 bg-white active:bg-black/5',
        variant === 'danger' && 'bg-red/10 text-red active:bg-red/20',
        className
      )}
      disabled={disabled || pending}
      {...props}
    >
      {pending ? loadingText : children}
    </button>
  );
}
