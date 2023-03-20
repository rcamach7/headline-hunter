import { NextApiRequest, NextApiResponse } from 'next';
import { getAllCategories } from '@/services/categoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const categories = await getAllCategories();
      if (!categories) {
        return res.status(404).json({ message: 'Error retrieving categories' });
      } else {
        return res.status(200).json({ categories });
      }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
