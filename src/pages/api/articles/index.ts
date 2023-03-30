import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/auth/[...nextauth]';
import { getNewsByCategories, CategoryNews } from '@/services/articleService';
import {
  getInitialCategories,
  getAdditionalCategories,
} from '@/services/categoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { initialRequest, current } = req.query;
    const isInitialRequest = initialRequest === 'true';
    const currentIds = current ? (current as string).split(',') : [];

    switch (req.method) {
      case 'GET':
        const session = await getServerSession(req, res, authOptions);

        let newsCategories: CategoryNews[];
        if (isInitialRequest) {
          const categories = await getInitialCategories(session);
          newsCategories = await getNewsByCategories(categories);
        } else {
          const categories = await getAdditionalCategories(currentIds);
          newsCategories = await getNewsByCategories(categories);
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
