import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/auth/[...nextauth]';
import { popularCategories } from '@/lib/data';
import { CategoryNews, getNewsByCategories } from '@/services/articleService';
import {
  getCategoryById,
  getCategoriesByIds,
} from '@/services/categoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        const categories = await getCategoriesByIds(
          popularCategories.map((c) => c.id)
        );
        const newsCategories = await getNewsByCategories(categories);
        return res.status(200).json({ newsCategories });
      } else {
      }

      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
