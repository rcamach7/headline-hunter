import { v4 } from 'uuid';
import { Category, Article } from '@prisma/client';

import prisma from '@/lib/prisma';
import NewsAPI from '@/lib/newsapi';

const ARTICLES_PER_PAGE = 10;
const MINIMUM_HOURS_BETWEEN_UPDATES = 4;
const PAST_DAYS_TO_QUERY = 15;
const PAGE_SIZE_PER_QUERY = 50;
const BYPASS_EVERYTHING_QUERY = false;

export type CategoryNews = {
  id: string;
  type: string;
  lastUpdated: Date;
  articles: Article[];
};

export async function getNewsByCategories(categories: Category[]) {
  for (const category of categories) {
    await refreshArticlesByCategory(category.id);
  }
  const categoryNews: CategoryNews[] = [];
  for (const category of categories) {
    const articles = await getArticlesByCategory(category.id, 1);
    categoryNews.push({
      ...category,
      articles,
    });
  }

  return categoryNews;
}

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

  // If the last updated is older than X hours, then update the articles
  if (diffHours > MINIMUM_HOURS_BETWEEN_UPDATES) {
    const articles = await queryForNewsByCategory(category.type);

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

async function queryForNewsByCategory(category: string) {
  const newsClient = new NewsAPI(process.env.NEWS_API_KEY);

  let topHeadlines;
  try {
    topHeadlines = await newsClient.getTopHeadlines({
      query: category,
      country: 'us',
      pageSize: PAGE_SIZE_PER_QUERY,
    });
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw new Error('Failed to fetch top headlines.');
  }

  if (!topHeadlines.articles.length && !BYPASS_EVERYTHING_QUERY) {
    const currentDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(currentDate.getDate() - PAST_DAYS_TO_QUERY);

    try {
      topHeadlines = await newsClient.getEverything({
        query: category,
        pageSize: PAGE_SIZE_PER_QUERY,
        to: currentDate,
        from: fromDate,
      });
    } catch (error) {
      console.error('Error fetching news articles:', error);
      throw new Error('Failed to fetch news articles.');
    }
  }

  if (!topHeadlines.articles) {
    return [];
  } else {
    return topHeadlines.articles.map((article) => ({
      id: v4() as string,
      ...article,
    }));
  }
}

export async function getArticleById(id: string) {
  return await prisma.article.findFirst({
    where: {
      id,
    },
  });
}
