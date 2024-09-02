-- CreateTable
CREATE TABLE "Illustration" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Illustration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Illustration_exerciseId_idx" ON "Illustration"("exerciseId");

-- AddForeignKey
ALTER TABLE "Illustration" ADD CONSTRAINT "Illustration_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
