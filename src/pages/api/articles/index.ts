import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/auth/[...nextauth]';
import { popularCategories } from '@/lib/data';
import { getNewsByCategories } from '@/services/articleService';
import { getCategoriesByIds } from '@/services/categoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const session = await getServerSession(req, res, authOptions);

        if (session) {
          const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
              savedCategories: true,
            },
          });

          const selectedCategories = getSelectedCategories(
            user.savedCategories
          );
          const newsCategories = await getNewsByCategories(selectedCategories);
          return res.status(200).json({ newsCategories });
        } else {
          const categories = await getCategoriesByIds(
            popularCategories.map((category) => category.id)
          );
          const newsCategories = await getNewsByCategories(categories);
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

function getSelectedCategories(savedCategories) {
  let selectedCategories = [...savedCategories];

  if (selectedCategories.length < 5) {
    const additionalCategoriesNeeded = 5 - selectedCategories.length;
    const additionalCategories = popularCategories
      .filter(
        (category) =>
          !selectedCategories.find(
            (savedCategory) => savedCategory.id === category.id
          )
      )
      .slice(0, additionalCategoriesNeeded);

    selectedCategories = [...selectedCategories, ...additionalCategories];
  }

  return selectedCategories;
}
