/*
  Warnings:

  - Added the required column `publishedAt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "content" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sourceId" TEXT,
ADD COLUMN     "sourceName" TEXT,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "urlToImage" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToUser_AB_unique" ON "_CategoryToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToUser_B_index" ON "_CategoryToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToUser_AB_unique" ON "_ArticleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToUser_B_index" ON "_ArticleToUser"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToUser" ADD CONSTRAINT "_CategoryToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToUser" ADD CONSTRAINT "_CategoryToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToUser" ADD CONSTRAINT "_ArticleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToUser" ADD CONSTRAINT "_ArticleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
