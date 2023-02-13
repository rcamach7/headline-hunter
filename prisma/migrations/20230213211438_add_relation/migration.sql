-- CreateTable
CREATE TABLE "_DislikedCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DislikedCategories_AB_unique" ON "_DislikedCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_DislikedCategories_B_index" ON "_DislikedCategories"("B");

-- AddForeignKey
ALTER TABLE "_DislikedCategories" ADD CONSTRAINT "_DislikedCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikedCategories" ADD CONSTRAINT "_DislikedCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
