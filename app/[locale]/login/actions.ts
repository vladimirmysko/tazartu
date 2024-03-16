'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { compare } from 'bcrypt';
import { getI18n } from '@/locales/server';
import { encrypt } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function login(prevState: { error: string }, formData: FormData) {
  const t = await getI18n();

  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();

  if (!username || !password) {
    throw new Error('Credentials not found');
  }

  const findedUser = await prisma.user.findUnique({ where: { username } });
  if (!findedUser) {
    return {
      error: t('login.invalid_login_credentials'),
    };
  }

  const isPasswordValid = await compare(password, findedUser.passwordHash);
  if (!isPasswordValid) {
    return {
      error: t('login.invalid_login_credentials'),
    };
  }

  const user = {
    id: findedUser.id,
    username: findedUser.username,
  };

  const hours = 24;
  const expires = new Date(Date.now() + hours * 60 * 60 * 1000);

  const session = await encrypt({ user, expires });

  cookies().set('session', session, { expires, httpOnly: true });
  redirect('dashboard/file-upload');
}
