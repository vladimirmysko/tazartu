import { cookies } from 'next/headers';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET_KEY ?? '4a093f0f4316acaa81ce3a1c6d381917';
const key = new TextEncoder().encode(secretKey);

interface Session extends JWTPayload {
  user: {
    id: string;
    username: string;
  };
}

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);
}

export async function decrypt(jwt: string): Promise<Session> {
  const { payload } = await jwtVerify(jwt, key, {
    algorithms: ['HS256'],
  });
  return payload as Session;
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}
