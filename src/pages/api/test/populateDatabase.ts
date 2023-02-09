import Newsapi, { ApiNewsCategory } from '../../../lib/newsapi';

const newsClient = new Newsapi(process.env.NEWS_API_KEY);
const defaultCategories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
  'environment',
  'politics',
  'lifestyle',
];

async function getTopNewsByCategory(category: ApiNewsCategory) {
  const topHeadlines = await newsClient.getTopHeadlines({
    country: 'us',
    category,
    pageSize: 20,
    page: 1,
  });

  return topHeadlines;
}
