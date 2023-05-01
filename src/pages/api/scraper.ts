import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        await getArticleContents();
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getArticleContents() {
  try {
    const article = await axios.get(
      'https://www.theguardian.com/culture/2023/apr/28/the-guide-ai-film-joe-russo'
    );

    const dom = new JSDOM(article.data, {
      url: 'https://www.theguardian.com/culture/2023/apr/28/the-guide-ai-film-joe-russo',
    });

    const articleContent = new Readability(dom.window.document).parse();
    console.log(articleContent.textContent);

    return articleContent.textContent;
  } catch (error) {
    console.error(error);
  }
}
