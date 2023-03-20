import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cid } = req.query;
  if (!cid || Array.isArray(cid))
    return res.status(400).json({ message: 'Missing category id field' });

  switch (req.method) {
    case 'GET':
      res.status(200).json({});
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
