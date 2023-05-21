/*
  Warnings:

  - Added the required column `title` to the `awards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "awards" ADD COLUMN     "title" TEXT NOT NULL;
