/*
  Warnings:

  - You are about to drop the column `relatorId` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_relatorId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "relatorId",
ADD COLUMN     "realtorId" INTEGER;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
