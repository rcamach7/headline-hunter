import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/auth/[...nextauth]';
import { getUserByEmail, toggleArticleFavorited } from '@/services/userService';
import { getArticleById } from '@/services/articleService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { aid } = req.query;
  if (!aid || Array.isArray(aid))
    return res.status(400).json({ message: 'Missing article ID field' });

  switch (req.method) {
    case 'POST':
      const user = await getUserByEmail(session.user.email);
      const category = await getArticleById(aid);
      if (!user)
        return res.status(404).json({ message: 'Error retrieving user' });

      try {
        await toggleArticleFavorited(user, category);
        return res.status(200).json({ message: 'Success' });
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Error toggling favorited status' });
      }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
