/*
  Warnings:

  - Added the required column `petId` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "petId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "disponible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "orgId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
