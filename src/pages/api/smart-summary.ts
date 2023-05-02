import { NextApiRequest, NextApiResponse } from 'next';
import {
  OpenAIApi,
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { getServerSession } from 'next-auth/next';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

import { authOptions } from '@/auth/[...nextauth]';

const MAX_TOKENS = 1000;
const MAX_ARTICLE_LENGTH = 4000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session.user)
    res.status(401).json({ message: 'Unauthorized, please log in.' });

  const { article, url } = req.body;
  let articleContent = article as string;

  if (!articleContent) {
    if (!url) {
      return res.status(400).json({ message: 'No article or URL provided.' });
    }
    articleContent = await getArticleContent(url as string);
  }
  articleContent = articleContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length)
    .join('\n');

  switch (req.method) {
    case 'POST':
      if (articleContent.length > MAX_ARTICLE_LENGTH) {
        return res.status(400).json({
          message: `Article is too long, max length is ${MAX_ARTICLE_LENGTH}`,
        });
      }

      const summary = await generateAiSummary(articleContent);
      return res.status(200).json(summary);

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function generateAiSummary(content: string) {
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

async function getArticleContent(URL: string) {
  try {
    const response = await axios.get(URL);
    const doc = new JSDOM(response.data, { url: URL });

    const article = new Readability(doc.window.document).parse();
    return article.textContent;
  } catch (error) {
    console.error(error);
  }
}
