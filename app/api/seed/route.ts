import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

interface UserToCreate extends Omit<User, 'id'> {}

export async function GET() {
  try {
    const passwordHash = await hash('1234', 10);
    const user: UserToCreate = { username: 'john.doe', passwordHash };

    await prisma.user.create({ data: user });

    return NextResponse.json('Success');
  } catch (error) {
    return NextResponse.json(error);
  }
}
