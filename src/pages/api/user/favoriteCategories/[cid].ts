import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import {
  getUserByEmail,
  toggleCategoryFavorited,
} from '@/services/userService';
import { getCategoryById } from '@/services/categoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) res.status(401).json({ message: 'Unauthorized' });

  const { cid } = req.query;
  if (!cid || Array.isArray(cid))
    return res.status(400).json({ message: 'Missing categoryId field' });

  switch (req.method) {
    case 'POST':
      const user = await getUserByEmail(session.user.email);
      const category = await getCategoryById(cid);
      if (!user)
        return res
          .status(404)
          .json({ message: 'Error retrieving user or category' });

      try {
        await toggleCategoryFavorited(user, category);
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
