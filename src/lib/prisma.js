import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
    },
  });

  return user;
}
