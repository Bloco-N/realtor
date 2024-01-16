/*
  Warnings:

  - You are about to drop the column `nameAgency` on the `partnerships` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[agency]` on the table `partnerships` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "partnerships_nameAgency_key";

-- AlterTable
ALTER TABLE "partnerships" DROP COLUMN "nameAgency";

-- CreateIndex
CREATE UNIQUE INDEX "partnerships_agency_key" ON "partnerships"("agency");
