'use server';

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { saveFile } from '@/lib/file-system';
import { readPDF } from '@/lib/pdf';
import { prisma } from '@/lib/prisma';

const decodeString = (str: string) => {
  const buffer = Buffer.from(str, 'latin1');
  return buffer.toString('utf8');
};

export async function uploadFile(prevState: { error: string }, formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const file = formData.get('file') as unknown as File;

  if (!file) {
    return {
      error: 'Invalid input',
    };
  }

  const { fileId, fileSavePath } = await saveFile(file);
  const text = await readPDF(fileSavePath);

  await prisma.document.create({
    data: {
      id: fileId,
      name: decodeString(file.name),
      userId: session.user.id,
      text: text.trim(),
    },
  });

  redirect('history');
}
