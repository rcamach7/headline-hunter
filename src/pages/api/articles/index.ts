import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/auth/[...nextauth]';
import { popularCategories } from '@/lib/data';
import { CategoryNews, getNewsByCategories } from '@/services/articleService';
import { getCategoriesByIds } from '@/services/categoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
          const categories = await getCategoriesByIds(
            popularCategories.map((category) => category.id)
          );
          const newsCategories = await getNewsByCategories(categories);
          return res.status(200).json({ newsCategories });
        } else {
          const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
              savedCategories: true,
            },
          });
          const newsCategories: CategoryNews[] = await getNewsByCategories(
            user.savedCategories
          );
          return res.status(200).json({ newsCategories });
        }

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
}
