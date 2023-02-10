import Newsapi, { ApiNewsCategory } from '../../../lib/newsapi';
import { PrismaClient } from '@prisma/client';

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

  return topHeadlines.articles;
}

async function getDefaultNews() {
  // P1: Query all categories that are defined as default news categories.
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      type: {
        in: defaultCategories,
      },
    },
  });

  // P:2 Traverse each category, and check the lastUpdated field.
  const promises = categories.map(async (category) => {
    const lastUpdated = new Date(category.lastUpdated);
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const diffHours = Math.floor(diff / 1000 / 60 / 60);

    // P:2.1 If the lastUpdated field is older than 1 day,
    // then query NewsAPI for new articles from that category type.
    if (diffHours > 1) {
      const articles = await getTopNewsByCategory(
        category.type as ApiNewsCategory
      );
      /**
       * P:2.1.1 Add all the articles returned into the Articles table.
       * The category field must be set to the category that was queried.
       */
      const newArticles = await prisma.article.createMany({
        data: articles.map((article) => ({
          author: article.author,
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          sourceId: article.source.name,
          sourceName: article.source.name,
          categories: {
            connect: {
              id: category.id,
            },
          },
        })),
      });
      const articleIds = newArticles.data.map((article) => article.id);

      /** P: 2.1.2
       *  Update that category to have reference to each article just queried.
       */
      await prisma.category.update({
        where: {
          id: category.id,
        },
        data: {
          articles: {
            connect: newArticles.map((article) => ({
              id: article.id,
            })),
          },
          lastUpdated: now,
        },
      });

      // const updatedCategory = await prisma.category.update({
      //   where: {
      //     id: category.id,
      //   },
      //   data: {
      //     articles: {
      //       create: articles.map((article) => ({
      //         author: article.author,
      //         title: article.title,
      //         description: article.description,
      //         content: article.content,
      //         url: article.url,
      //         urlToImage: article.urlToImage,
      //         publishedAt: article.publishedAt,
      //         sourceId: article.source.name,
      //         sourceName: article.source.name,
      //         categories: {
      //           connect: {
      //             id: category.id,
      //           },
      //         },
      //       })),
      //     },
      //     lastUpdated: now,
      //   },
      // });
      // return updatedCategory;
    } else {
      return category;
    }
  });

  // const nestedArticles = await Promise.all(promises);
  // const newsArticles = nestedArticles.reduce(
  //   (acc, articles) => acc.concat(articles),
  //   []
  // );

  return categories;
}

export default async function handler(req, res) {
  const categories = await getDefaultNews();

  res.status(200).json(categories);
}
