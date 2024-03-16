import type { Metadata } from 'next';
import { getI18n } from '@/locales/server';

import { FileUploadForm } from '@/components/forms/file-upload-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: t('file_upload.title'),
  };
}

export const dynamic = 'force-dynamic';

export default async function UploadFilePage() {
  const t = await getI18n();

  return <FileUploadForm acceptCharset="UTF-8" className="w-full max-w-sm" />;
}
