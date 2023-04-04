import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { content } = req.query;
  let articleContent = content as string;
  if (!articleContent) {
    return res.status(400).json({ message: 'Missing latitude or longitude' });
  }

  switch (req.method) {
    case 'GET':

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
