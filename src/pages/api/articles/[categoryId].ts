import { NextApiRequest, NextApiResponse } from 'next';

import { getArticlesByCategory } from '@/services/articleService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { categoryId, page } = req.query;
  const pageNumber = page ? parseInt(page as string) : 1;

  if (!categoryId || Array.isArray(categoryId))
    return res.status(400).json({ message: 'Missing category fields' });

  switch (req.method) {
    case 'GET':
      const articles = await getArticlesByCategory(
        categoryId as string,
        pageNumber
      );
      res.status(200).json({ articles });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
