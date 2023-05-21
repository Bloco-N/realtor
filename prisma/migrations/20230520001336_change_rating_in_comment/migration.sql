/*
  Warnings:

  - You are about to drop the column `rating` on the `comments` table. All the data in the column will be lost.
  - Added the required column `marketExpertiseRating` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `negotiationSkillsRating` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profissionalisAndComunicationRating` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsivenessRating` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "rating",
ADD COLUMN     "marketExpertiseRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "negotiationSkillsRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "profissionalisAndComunicationRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "responsivenessRating" DOUBLE PRECISION NOT NULL;
