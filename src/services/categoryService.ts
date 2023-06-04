import prisma from '@/lib/prisma';

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
    } else {
      return categories;
    }
  } else {
    return await getCategoriesByIds(
      defaultCategories.map((category) => category.id)
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

export const defaultCategories = [
  {
    id: '77d0b6a2-4685-4a5e-9d60-87e05fa5356e',
    type: 'business',
    lastUpdated: null,
  },
  {
    id: '2c6a96f2-25cc-4afd-b78a-eeeb54e58847',
    type: 'entertainment',
    lastUpdated: null,
  },
  {
    id: '928a68a2-7387-4305-b8a8-870ba0929df6',
    type: 'sports',
    lastUpdated: null,
  },
  {
    id: '44d25b34-6778-41cf-a09b-75f7fba28fec',
    type: 'technology',
    lastUpdated: null,
  },
  {
    id: 'b1dfe2c4-14e0-4a14-8ff4-ed8a7df49601',
    type: 'politics',
    lastUpdated: null,
  },
];
