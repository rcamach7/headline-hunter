import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      savedArticles: true,
      savedCategories: true,
      dislikedCategories: true,
    },
  });

  if (!user) res.status(404).json({ message: 'User not found' });
  return res.status(200).json({ user });
}
