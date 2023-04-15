/*
  Warnings:

  - You are about to drop the column `description` on the `properties` table. All the data in the column will be lost.
  - Added the required column `preservation` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('HOME', 'APARTMENT', 'NEW_BUILDING', 'OFFICE', 'COMMERCIAL', 'GARAGE', 'LAND', 'BUILDING', 'COLLECTION');

-- CreateEnum
CREATE TYPE "Rooms" AS ENUM ('T1', 'T2', 'T3', 'T4_PLUS');

-- CreateEnum
CREATE TYPE "Preservation" AS ENUM ('NEW_BUILDING', 'GOOD', 'TO_RECOVER');

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "description",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "grossArea" TEXT,
ADD COLUMN     "preservation" "Preservation" NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "rooms" "Rooms",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usefulArea" TEXT;
