import fs from 'fs';
import { customAlphabet } from 'nanoid';

export async function saveFile(file: File) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 21);

  const fileId = nanoid();
  const fileExt = file.name.split('.').pop();
  const savePath = `${process.env.STORAGE_PATH}`;
  const fileSavePath = `${savePath}/${fileId}.${fileExt}`;

  try {
    await fs.promises.access(savePath);
  } catch {
    await fs.promises.mkdir(savePath, { recursive: true });
  }

  const stream = file.stream();
  await stream.pipeTo(
    new WritableStream({
      write(chunk) {
        return new Promise((resolve, reject) => {
          const buffer = Buffer.from(chunk);
          fs.appendFileSync(fileSavePath, buffer);
          resolve();
        });
      },
      abort(err) {
        console.log('Sink error:', err);
      },
    })
  );

  return { fileId, fileSavePath };
}
