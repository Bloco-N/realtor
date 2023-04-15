/*
  Warnings:

  - You are about to drop the column `agencyId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `realtorId` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_realtorId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "agencyId",
DROP COLUMN "realtorId";

-- CreateTable
CREATE TABLE "realtor_services" (
    "id" SERIAL NOT NULL,
    "realtorId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "realtor_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "realtor_services" ADD CONSTRAINT "realtor_services_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_services" ADD CONSTRAINT "realtor_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
