/*
  Warnings:

  - You are about to drop the column `disponible` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "disponible",
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;
