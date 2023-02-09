-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "urlToImage" DROP NOT NULL,
ALTER COLUMN "sourceId" DROP NOT NULL,
ALTER COLUMN "sourceName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SavedArticles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DislikedCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SavedArticles_AB_unique" ON "_SavedArticles"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedArticles_B_index" ON "_SavedArticles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedCategories_AB_unique" ON "_SavedCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedCategories_B_index" ON "_SavedCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DislikedCategories_AB_unique" ON "_DislikedCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_DislikedCategories_B_index" ON "_DislikedCategories"("B");

-- AddForeignKey
ALTER TABLE "_SavedArticles" ADD CONSTRAINT "_SavedArticles_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedArticles" ADD CONSTRAINT "_SavedArticles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedCategories" ADD CONSTRAINT "_SavedCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedCategories" ADD CONSTRAINT "_SavedCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikedCategories" ADD CONSTRAINT "_DislikedCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikedCategories" ADD CONSTRAINT "_DislikedCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
