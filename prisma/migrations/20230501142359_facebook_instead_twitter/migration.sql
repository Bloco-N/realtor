/*
  Warnings:

  - You are about to drop the column `twitter` on the `agencies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "agencies" DROP COLUMN "twitter",
ADD COLUMN     "facebook" TEXT;
