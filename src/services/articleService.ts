import prisma from '@/lib/prisma';
import Newsapi, { ApiNewsCategory } from '@/lib/newsapi';
import { v4 } from 'uuid';

export const getArticlesByCategory = async (category: string) => {
  await refreshArticlesByCategory(category);

  const articles = await prisma.article.findMany({
    include: {
      categories: true,
    },
    where: {
      categories: {
        some: {
          type: category,
        },
      },
    },
  });

  return articles || [];
};

/**
 *  Will return a boolean if the category passed in was updated.
 * @param type
 * @returns boolean
 */
const refreshArticlesByCategory = async (type: string) => {
  const category = await prisma.category.findFirst({
    where: {
      type,
    },
  });
  if (!category) {
    return false;
  } else {
    const lastUpdated = new Date(category.lastUpdated);
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);

    // If the last updated is older than X hours, then update the articles
    if (diffHours > 4) {
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
  }
};

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
