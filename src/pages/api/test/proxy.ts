import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  try {
    const response = await axios.get(url as string);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
