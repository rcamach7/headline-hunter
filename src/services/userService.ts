import { Article, Category, User } from '@prisma/client';

import prisma from '@/lib/prisma';

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email: email },
    include: {
      savedArticles: true,
      savedCategories: true,
      dislikedCategories: true,
    },
  });
}

export async function toggleCategoryFavorited(
  user: User & {
    savedCategories: Category[];
    savedArticles: Article[];
    dislikedCategories: Category[];
  },
  category: Category
) {
  const isFavorited = user.savedCategories.some(
    (savedCategory) => savedCategory.id === category.id
  );

  if (isFavorited) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        savedCategories: {
          disconnect: { id: category.id },
        },
      },
    });
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        savedCategories: {
          connect: { id: category.id },
        },
      },
    });
  }
}

export async function toggleArticleFavorited(
  user: User & {
    savedCategories: Category[];
    savedArticles: Article[];
    dislikedCategories: Category[];
  },
  article: Article
) {
  const isFavorited = user.savedArticles.some(
    (savedArticle) => savedArticle.id === article.id
  );

  if (isFavorited) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        savedArticles: {
          disconnect: { id: article.id },
        },
      },
    });
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        savedArticles: {
          connect: { id: article.id },
        },
      },
    });
  }
}
