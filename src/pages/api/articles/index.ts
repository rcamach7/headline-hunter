import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { Category } from '@prisma/client';

import { authOptions } from '@/auth/[...nextauth]';
import { popularCategories } from '@/lib/data';
import { getNewsByCategories, CategoryNews } from '@/services/articleService';
import {
  getCategoriesByIds,
  getCustomCategories,
} from '@/services/categoryService';
import { getUserByEmail } from '@/services/userService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const session = await getServerSession(req, res, authOptions);

        let newsCategories: CategoryNews[];
        let selectedCategories: Category[];
        if (session) {
          const user = await getUserByEmail(session.user.email);
          selectedCategories = getCustomCategories(user.savedCategories);
          newsCategories = await getNewsByCategories(selectedCategories);
        } else {
          selectedCategories = await getCategoriesByIds(
            popularCategories.map((category) => category.id)
          );
          newsCategories = await getNewsByCategories(selectedCategories);
        }

        return res.status(200).json({ newsCategories });

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
}
