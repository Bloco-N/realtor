/*
  Warnings:

  - Added the required column `energyefficience` to the `properties` table without a default value. This is not possible if the table is not empty.
 e outras coisas
*/
-- CreateEnum
CREATE TYPE "EnergyEfficience" AS ENUM ('AP', 'A', 'B', 'Bm', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "energyefficience" "EnergyEfficience" NOT NULL;
