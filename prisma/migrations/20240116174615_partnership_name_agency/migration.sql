/*
  Warnings:

  - A unique constraint covering the columns `[nameAgency]` on the table `partnerships` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "partnerships" ADD COLUMN     "nameAgency" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "partnerships_nameAgency_key" ON "partnerships"("nameAgency");
