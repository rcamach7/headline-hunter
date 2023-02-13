/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `sourceName` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `urlToImage` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DislikedCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SavedArticles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SavedCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DislikedCategories" DROP CONSTRAINT "_DislikedCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_DislikedCategories" DROP CONSTRAINT "_DislikedCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_SavedArticles" DROP CONSTRAINT "_SavedArticles_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedArticles" DROP CONSTRAINT "_SavedArticles_B_fkey";

-- DropForeignKey
ALTER TABLE "_SavedCategories" DROP CONSTRAINT "_SavedCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedCategories" DROP CONSTRAINT "_SavedCategories_B_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content",
DROP COLUMN "publishedAt",
DROP COLUMN "sourceId",
DROP COLUMN "sourceName",
DROP COLUMN "url",
DROP COLUMN "urlToImage";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_DislikedCategories";

-- DropTable
DROP TABLE "_SavedArticles";

-- DropTable
DROP TABLE "_SavedCategories";
