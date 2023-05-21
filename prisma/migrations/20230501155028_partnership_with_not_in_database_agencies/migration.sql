/*
  Warnings:

  - Added the required column `agency` to the `partnerships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "partnerships" DROP CONSTRAINT "partnerships_agencyId_fkey";

-- AlterTable
ALTER TABLE "partnerships" ADD COLUMN     "agency" TEXT NOT NULL,
ALTER COLUMN "agencyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "partnerships" ADD CONSTRAINT "partnerships_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
