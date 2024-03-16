'use client';

import { useFormState } from 'react-dom';
import { useI18n } from '@/locales/client';
import { cn } from '@/lib/utils';

import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { FileInput } from '@/components/ui/file-input';
import { Button } from '@/components/ui/button';

import { uploadFile } from '@/app/[locale]/dashboard/file-upload/actions';

interface FileUploadFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children'> {}

const initialState = {
  error: '',
};

export function FileUploadForm({ className, ...props }: FileUploadFormProps) {
  const t = useI18n();
  const [state, formAction] = useFormState(uploadFile, initialState);

  return (
    <form
      action={formAction}
      className={cn('flex flex-col items-stretch gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-stretch gap-2">
        <h1 className="font-display text-xl font-semibold">{t('dashboard.file_upload')}</h1>
        <p className="text-xs text-black/60">{t('file_upload.securely_upload')}</p>
      </div>
      <Field>
        <Label htmlFor="file">{t('file_upload.file')}</Label>
        <FileInput name="file" id="file" accept="application/pdf" />
      </Field>
      <Button type="submit" loadingText={t('file_upload.uploading')}>
        {t('file_upload.start_checking')}
      </Button>
    </form>
  );
}
