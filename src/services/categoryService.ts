import prisma from '@/lib/prisma';
import { Category } from '@prisma/client';
import { popularCategories } from '@/lib/data';

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

export function getCustomCategories(savedCategories: Category[]) {
  let selectedCategories = [...savedCategories];

  if (selectedCategories.length < 5) {
    const additionalCategoriesNeeded = 5 - selectedCategories.length;
    const additionalCategories = popularCategories
      .filter(
        (category) =>
          !selectedCategories.find(
            (savedCategory) => savedCategory.id === category.id
          )
      )
      .slice(0, additionalCategoriesNeeded);

    selectedCategories = [...selectedCategories, ...additionalCategories];
  }

  return selectedCategories;
}
