import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUrl = req.query.url;

  // Check if the image URL is provided
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl === 'Unknown') {
    return res.status(400).json({ error: 'Invalid or missing image URL' });
  }

  // Check if the image URL points to an image and is accessible
  try {
    const headResponse = await axios.head(imageUrl);
    const contentType = headResponse.headers['content-type'];

    if (!contentType.startsWith('image/')) {
      return res.status(400).json({ error: 'URL does not point to an image' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid or inaccessible image URL' });
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
