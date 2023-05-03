import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).send('Hello World');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
