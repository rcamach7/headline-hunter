import { NextApiRequest, NextApiResponse } from 'next';
import {
  OpenAIApi,
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import prisma from '@/lib/prisma';

const MAX_TOKENS = 1000;
const MAX_ARTICLE_LENGTH = 4000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const metDailyUsageLimit = await metDailyUsageLimit();
  if (metDailyUsageLimit) {
    return res.status(400).json({
      message: 'Daily usage limit met, please try again tomorrow',
    });
  }

  const { article, url } = req.body;
  let articleContent = article as string;

  if (!articleContent) {
    if (!url) {
      return res.status(400).json({ message: 'No article or URL provided.' });
    }
    try {
      articleContent = await getArticleContent(url as string);
      if (!articleContent.length) {
        return res.status(400).json({
          message:
            'Unable to scrape article content, please manually perform scrape',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          'Unable to scrape article content, please manually perform scrape',
      });
    }
  }

  articleContent = articleContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length)
    .join('\n');
  if (articleContent.length > MAX_ARTICLE_LENGTH) {
    articleContent = articleContent.substring(0, MAX_ARTICLE_LENGTH);
  }

  switch (req.method) {
    case 'POST':
      try {
        const summary = await generateAiSummary(articleContent);
        return res.status(200).json(summary);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: 'Unable to generate summary through OpenAI.' });
      }

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

async function metDailyUsageLimit() {
  try {
    const gptUsage = await getGptUsage();

    const today = new Date();
    const lastUsed = gptUsage.lastUsed;

    if (!isSameDay(today, lastUsed)) {
      prisma.apiUsageTracker.update({
        where: { name: 'gpt-3.5-turbo' },
        data: {
          lastUsed: today,
          calls: 0,
        },
      });
      return false;
    } else if (gptUsage.calls >= 250) {
      console.log('Call limit reached');
      return true;
    } else {
      prisma.apiUsageTracker.update({
        where: { name: 'gpt-3.5-turbo' },
        data: {
          calls: gptUsage.calls + 1,
        },
      });
      return false;
    }
  } catch (error) {
    console.error(error);
    return true;
  }
}

const getGptUsage = async () => {
  try {
    const gptUsage = prisma.apiUsageTracker.findUnique({
      where: { id: 'gpt-3.5-turbo' },
    });
    if (!gptUsage) {
      prisma.apiUsageTracker.create({
        data: {
          name: 'gpt-3.5-turbo',
        },
      });
    }
    return gptUsage;
  } catch (error) {
    console.error(error);
  }
};

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
