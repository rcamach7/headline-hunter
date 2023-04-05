import { NextApiRequest, NextApiResponse } from 'next';
import {
  OpenAIApi,
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/auth/[...nextauth]';

const MAX_TOKENS = 500;
const MAX_ARTICLE_LENGTH = 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session.user)
    res.status(401).json({ message: 'Unauthorized, please log in.' });

  const { article } = req.body;
  let articleContent = article as string;
  if (!articleContent) {
    return res.status(400).json({ message: 'Missing article content' });
  }

  switch (req.method) {
    case 'POST':
      articleContent = articleContent
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length)
        .join('\n');

      const summary = await getSummary(articleContent);
      return res.status(200).json(summary);

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getSummary(content: string) {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(config);

  const prompt = `Please provide a short summary of the following article:\n\n${content}`;
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are ChatGPT, an AI language model.',
    },
    { role: ChatCompletionRequestMessageRoleEnum.User, content: prompt },
  ];

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: MAX_TOKENS,
  });

  console.log('usage: ', response.data.usage);
  return response.data.choices[0].message.content;
}
