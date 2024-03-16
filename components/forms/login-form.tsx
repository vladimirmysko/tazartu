'use client';

import { useFormState } from 'react-dom';
import { useI18n } from '@/locales/client';
import { cn } from '@/lib/utils';

import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { login } from '@/app/[locale]/login/actions';

interface LoginFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children'> {}

const initialState = {
  error: '',
};

export function LoginForm({ className, ...props }: LoginFormProps) {
  const t = useI18n();
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form
      action={formAction}
      autoComplete="off"
      autoCorrect="off"
      className={cn('flex flex-col items-stretch gap-6', className)}
      {...props}
    >
      {state.error && (
        <div className="text-red text-2xs flex flex-row items-center gap-1 font-medium">
          <ExclamationCircleIcon className="h-4 w-4" />
          <span>{state.error}</span>
        </div>
      )}
      <div className="flex flex-col items-stretch gap-2">
        <h1 className="font-display text-xl font-semibold">{t('login.welcome_back')}</h1>
        <p className="text-xs text-black/60">{t('login.log_in_to_continue')}</p>
      </div>
      <div className="flex flex-col items-stretch gap-4">
        <Field>
          <Label htmlFor="username">{t('login.username')}</Label>
          <Input name="username" id="username" placeholder="john.doe" required />
        </Field>
        <Field>
          <Label htmlFor="password">{t('login.password')}</Label>
          <Input name="password" id="password" placeholder="••••••••" type="password" required />
        </Field>
      </div>
      <Button type="submit" loadingText={t('login.entering')}>
        {t('login.enter')}
      </Button>
    </form>
  );
}
