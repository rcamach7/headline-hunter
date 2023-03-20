import prisma from '@/lib/prisma';

export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  return category;
};

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};
