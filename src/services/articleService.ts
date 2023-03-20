import prisma from '@/lib/prisma';
import Newsapi, { ApiNewsCategory } from '@/lib/newsapi';
import { v4 } from 'uuid';

const MAX_ARTICLES = 20;
const MINIMUM_HOURS_BETWEEN_UPDATES = 4;
const PAST_DAYS_TO_QUERY = 15;

export const getArticlesByCategory = async (categoryId: string) => {
  let articles = [];

  try {
    await refreshArticlesByCategory(categoryId);

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
      take: MAX_ARTICLES,
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
    return;
  }

  const lastUpdated = new Date(category.lastUpdated);
  const now = new Date();
  const diff = now.getTime() - lastUpdated.getTime();
  const diffHours = Math.floor(diff / 1000 / 60 / 60);

  // If the last updated is older than X hours, then update the articles
  if (diffHours > MINIMUM_HOURS_BETWEEN_UPDATES) {
    const articles = await getTopNewsByCategory(
      category.type as ApiNewsCategory
    );

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

async function getTopNewsByCategory(category: ApiNewsCategory) {
  const newsClient = new Newsapi(process.env.NEWS_API_KEY);

  let topHeadlines = await newsClient.getTopHeadlines({
    country: 'us',
    category,
    pageSize: 20,
    page: 1,
  });

  if (!topHeadlines.articles.length) {
    const currentDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(currentDate.getDate() - PAST_DAYS_TO_QUERY);

    topHeadlines = await newsClient.getEverything({
      q: category,
      pageSize: 20,
      page: 1,
      to: currentDate.toISOString(),
      from: fromDate.toISOString(),
    });
  }

  return topHeadlines.articles.map((article) => ({
    id: v4() as string,
    ...article,
  }));
}
