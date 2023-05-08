import { NextApiRequest, NextApiResponse } from 'next';

export async function testHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Test API Endpoint Hit');
  res.send('Test API Endpoint Hit');
}
