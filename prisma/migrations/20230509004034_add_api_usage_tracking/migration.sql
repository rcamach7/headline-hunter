-- CreateTable
CREATE TABLE "ApiUsageTracker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calls" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maxRequests" INTEGER NOT NULL DEFAULT 250,

    CONSTRAINT "ApiUsageTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiUsageTracker_name_key" ON "ApiUsageTracker"("name");
