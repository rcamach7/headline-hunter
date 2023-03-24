import prisma from '@/lib/prisma';
import { v4 } from 'uuid';

import NewsAPI from '@/lib/newsapi';
import { popularCategories } from '@/lib/data';
import { Category } from '@prisma/client';

export default async function handler(req, res) {
  const articles = await getNewsByCategories();

  res.status(200).json({ articles });
}

async function getNewsByCategories(categories: Category[]) {
  /**
   * P:2 Traverse each category, and check the lastUpdated field.
   */
  const updateCategoryArticlesPromises = categories.map(async (category) => {
    const lastUpdated = new Date(category.lastUpdated);
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);

    /**
     * P:2.1 If the lastUpdated field is older than 1 hour,
     * then query NewsAPI for new articles from that category type.
     */
    if (diffHours > 4) {
      const articles = await getNewsByCategory(category.type);
      /**
       * P:2.1.1 Add all the articles returned into the Articles table.
       * The category field must be set to the category that was queried.
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
           * P: 2.1.2 Update that category to have reference
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
    }
  });
  await Promise.all(updateCategoryArticlesPromises);

  /**
   * P:3 Return a complete collection of all
   * articles under these default categories, now that it's all up to date.
   */
  const allArticles = await prisma.article.findMany({
    where: {
      categories: {
        some: {
          id: {
            in: categories.map((category) => category.id),
          },
        },
      },
    },
  });

  return allArticles;
}
