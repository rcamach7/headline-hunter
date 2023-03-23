import { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '@prisma/client';

import {
  getCategoryById,
  deleteCategoryAndAssociatedArticles,
} from '@/services/categoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cid = req.query.cid as string;
  if (!cid || Array.isArray(cid))
    return res.status(400).json({ message: 'Missing category id field' });

  let category: Category | null = null;
  switch (req.method) {
    case 'GET':
      try {
        category = await getCategoryById(cid);
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        } else {
          return res.status(200).json({ category });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'DELETE':
      try {
        category = await getCategoryById(cid);
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        } else {
          await deleteCategoryAndAssociatedArticles(cid);
          return res.status(200).json({ message: 'Category deleted' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
