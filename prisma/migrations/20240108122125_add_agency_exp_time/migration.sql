/*
  Warnings:

  - Made the column `password` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "agencies" ADD COLUMN     "expTime" INTEGER;

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "password" SET NOT NULL;
