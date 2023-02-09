import Newsapi, { ApiNewsCategory } from '../../../lib/newsapi';

const newsClient = new Newsapi(process.env.NEWS_API_KEY);
const defaultCategories: ApiNewsCategory[] = [
  'business',
  // 'entertainment',
  // 'sports',
  // 'technology',
  // 'politics',
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

async function getDefaultNews() {
  const promises = defaultCategories.map(async (category) => {
    const topNews = await getTopNewsByCategory(category);
    return topNews.articles;
  });

  const nestedArticles = await Promise.all(promises);
  const newsArticles = nestedArticles.reduce(
    (acc, articles) => acc.concat(articles),
    []
  );

  return newsArticles;
}

export default async function handler(req, res) {
  const newsArticles = await getDefaultNews();

  res.status(200).json(newsArticles);
}
