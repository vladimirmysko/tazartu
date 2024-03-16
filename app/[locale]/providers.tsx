'use client';

import { I18nProviderClient } from '@/locales/client';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
}

export function Providers({ children, locale }: Readonly<ProvidersProps>) {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
