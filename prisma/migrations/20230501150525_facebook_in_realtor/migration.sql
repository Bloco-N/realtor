/*
  Warnings:

  - You are about to drop the column `twitter` on the `realtors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "realtors" DROP COLUMN "twitter",
ADD COLUMN     "facebook" TEXT;
