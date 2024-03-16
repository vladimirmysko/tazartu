'use client';

import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import { cn } from '@/lib/utils';

import { Select } from '@/components/ui/select';

interface LocaleSwitcherProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Select>, 'children'> {
  containerClassName?: string;
}

export function LocaleSwitcher({ className, containerClassName, ...props }: LocaleSwitcherProps) {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  const locales: { value: 'en' | 'ru' | 'kk'; label: string }[] = [
    { value: 'kk', label: 'Қазақ' },
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
  ];

  return (
    <Select
      className={cn('', className)}
      name="locale"
      id="locale"
      defaultValue={currentLocale}
      onChange={(e) => changeLocale(e.target.value as 'en' | 'ru' | 'kk')}
      {...props}
    >
      {locales.map((locale) => (
        <option key={locale.value} value={locale.value}>
          {locale.label}
        </option>
      ))}
    </Select>
  );
}
