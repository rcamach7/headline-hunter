import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUrl = req.query.url;

  if (!imageUrl || typeof imageUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing image URL' });
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.status(200).send(Buffer.from(response.data));
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch image' });
  }
}
