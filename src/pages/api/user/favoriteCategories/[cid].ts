import { NextApiRequest, NextApiResponse } from 'next';
import { getCategoryById } from '@/services/categoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cid } = req.query;
  if (!cid || Array.isArray(cid))
    return res.status(400).json({ message: 'Missing category id field' });

  switch (req.method) {
    case 'POST':
      const category = await getCategoryById(cid as string);
      if (!category)
        return res.status(404).json({ message: 'Category not found' });

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
