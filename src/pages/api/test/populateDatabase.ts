import Newsapi, { ApiNewsCategory } from '../../../lib/newsapi';
import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const defaultCategories: ApiNewsCategory[] = [
  'business',
  // 'entertainment',
  // 'sports',
  // 'technology',
  // 'politics',
];

export default async function handler(req, res) {
  const articles = await getDefaultNews();

  res.status(200).json(articles);
}

async function getDefaultNews() {
  /**
   * P1: Query all categories that are defined as default news categories.
   * TODO: If a category is not found, create it.
   */
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      type: {
        in: defaultCategories,
      },
    },
  });

  /**
   * P:2 Traverse each category, and check the lastUpdated field.
   */
  const promises = categories.map(async (category) => {
    const lastUpdated = new Date(category.lastUpdated);
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);

    /**
     * P:2.1 If the lastUpdated field is older than 1 hour,
     * then query NewsAPI for new articles from that category type.
     */
    if (diffHours > 0.5) {
      const articles = await getTopNewsByCategory(
        category.type as ApiNewsCategory
      );
      /**
       * P:2.1.1 Add all the articles returned into the Articles table.
       * The category field must be set to the category that was queried.
       */
      await prisma.article.createMany({
        data: articles.map((article) => ({
          id: article.id,
          author: article.author ? article.author : 'Unknown',
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt ? article.publishedAt : now,
          sourceId: article.source.name ? article.source.name : 'Unknown',
          sourceName: article.source.name ? article.source.name : 'Unknown',
          categories: {
            connect: {
              id: category.id,
            },
          },
        })),
      });

      /**
       * P: 2.1.2 Update that category to have reference
       * to each article just queried.
       */
      const updatedCategory = await prisma.category.update({
        where: {
          id: category.id,
        },
        data: {
          articles: {
            connect: articles.map((article) => ({
              id: article.id,
            })),
          },
          lastUpdated: now,
        },
      });

      return updatedCategory;
    } else {
      return category;
    }
  });

  /**
   * P:3 Return a complete collection of all
   * articles under these default categories, now that it's all up to date.
   */
  const updatedCategories = await Promise.all(promises);
  const allArticles = await prisma.article.findMany({
    where: {
      categories: {
        some: {
          id: {
            in: updatedCategories.map((category) => category.id),
          },
        },
      },
    },
  });

  return allArticles;
}

async function getTopNewsByCategory(category: ApiNewsCategory) {
  const newsClient = new Newsapi(process.env.NEWS_API_KEY);
  const topHeadlines = await newsClient.getTopHeadlines({
    country: 'us',
    category,
    pageSize: 20,
    page: 1,
  });

  return topHeadlines.articles.map((article) => ({
    id: v4() as string,
    ...article,
  }));
}
