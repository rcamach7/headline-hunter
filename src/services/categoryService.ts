import prisma from '@/lib/prisma';

import { popularCategories } from '@/lib/data';
import { getUserByEmail } from './userService';

export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  return category;
};

export const getCategoriesByIds = async (ids: string[]) => {
  const categories = await prisma.category.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return categories;
};

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};

export async function deleteCategoryAndAssociatedArticles(categoryId: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
    });

    const deletePromises = articles.map((article) =>
      prisma.article.delete({
        where: { id: article.id },
      })
    );
    await Promise.all(deletePromises);

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getInitialCategories(session: any) {
  if (session) {
    const user = await getUserByEmail(session.user.email);
    const categories = [...user.savedCategories];

    if (categories.length < 5) {
      const additionalCategoriesNeeded = 5 - categories.length;
      const additionalCategories = await prisma.category.findMany({
        take: additionalCategoriesNeeded,
        where: {
          NOT: {
            id: {
              in: categories.map((category) => category.id),
            },
          },
        },
      });

      return [...categories, ...additionalCategories];
    }
  } else {
    return await getCategoriesByIds(
      popularCategories.map((category) => category.id)
    );
  }
}

export async function getAdditionalCategories(current: string[]) {
  return prisma.category.findMany({
    where: {
      NOT: {
        id: {
          in: current,
        },
      },
    },
    take: 2,
  });
}
