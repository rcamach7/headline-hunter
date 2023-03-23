import { v4 } from 'uuid';

import prisma from '@/lib/prisma';
import NewsAPI from '@/lib/newsapi';

const ARTICLES_PER_PAGE = 10;
const MINIMUM_HOURS_BETWEEN_UPDATES = 4;
const PAST_DAYS_TO_QUERY = 15;

export const getArticlesByCategory = async (
  categoryId: string,
  pageNumber: number
) => {
  let articles = [];
  try {
    await refreshArticlesByCategory(categoryId);

    const skipCount = (pageNumber - 1) * ARTICLES_PER_PAGE;
    articles = await prisma.article.findMany({
      include: {
        categories: true,
      },
      where: {
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      skip: skipCount,
      take: ARTICLES_PER_PAGE,
    });
  } catch (error) {
    console.log('An error occurred while processing articles');
    console.log(error);
  }

  return articles;
};

/**
 *  Will return a boolean if the category passed in was updated. Will create a new category if it doesn't exist, and query for articles.
 * @param type
 * @returns boolean
 */
const refreshArticlesByCategory = async (id: string) => {
  let category = await prisma.category.findFirst({
    where: {
      id,
    },
  });
  if (!category) {
    return false;
  }

  const lastUpdated = new Date(category.lastUpdated);
  const now = new Date();
  const diff = now.getTime() - lastUpdated.getTime();
  const diffHours = Math.floor(diff / 1000 / 60 / 60);
  console.log('point one');

  // If the last updated is older than X hours, then update the articles
  if (diffHours > MINIMUM_HOURS_BETWEEN_UPDATES) {
    const articles = await getTopNewsByCategory(category.type);
    console.log('point two');

    /**
     * Build an array of promises to create each article.
     */
    const createArticlesPromises = articles.map((article) =>
      prisma.article
        .create({
          data: {
            id: article.id,
            author: article.author ?? 'Unknown',
            title: article.title ?? 'Unknown',
            description: article.description ?? 'Unknown',
            content: article.content ?? 'Unknown',
            url: article.url ?? 'Unknown',
            urlToImage: article.urlToImage ?? 'Unknown',
            publishedAt: article.publishedAt ?? now,
            sourceId: article.source.name ?? 'Unknown',
            sourceName: article.source.name ?? 'Unknown',
            categories: {
              connect: {
                id: category.id,
              },
            },
          },
        })
        /**
         * Update that category to have reference
         * to each article just queried.
         */
        .then((createdArticle) => {
          return prisma.category.update({
            where: {
              id: category.id,
            },
            data: {
              articles: {
                connect: {
                  id: createdArticle.id,
                },
              },
            },
          });
        })
        .catch((error) => {
          console.error(
            `An error occurred while creating article with ID: ${article.id}`
          );
          console.error(error);
        })
    );
    console.log('point three');
    await Promise.all(createArticlesPromises);

    // Updates last updated to now since we just updated the articles
    await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        lastUpdated: now,
      },
    });

    return true;
  } else {
    return false;
  }
};

async function getTopNewsByCategory(category: string) {
  console.log('in getTopNewsByCategory');
  const newsClient = new NewsAPI(process.env.NEWS_API_KEY);

  let topHeadlines;
  try {
    topHeadlines = await newsClient.getTopHeadlines({
      query: category,
      country: 'us',
      pageSize: 20,
    });
    console.log('topHeadlines: ', topHeadlines);
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw new Error('Failed to fetch top headlines.');
  }

  if (!topHeadlines.articles.length) {
    const currentDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(currentDate.getDate() - PAST_DAYS_TO_QUERY);

    try {
      console.log('about to call getEverything');
      topHeadlines = await newsClient.getEverything({
        query: category,
        pageSize: 20,
        to: currentDate,
        from: fromDate,
      });

      console.log('getEverything: ', topHeadlines);
    } catch (error) {
      console.error('Error fetching news articles:', error);
      throw new Error('Failed to fetch news articles.');
    }
  }

  console.log('about to return topHeadlines.articles.map');
  console.log(topHeadlines);
  return topHeadlines.articles.map((article) => ({
    id: v4() as string,
    ...article,
  }));
}
