/*
  Warnings:

  - Made the column `author` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "author" SET NOT NULL;
