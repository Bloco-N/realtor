-- DropForeignKey
ALTER TABLE "agencies" DROP CONSTRAINT "agencies_addressId_fkey";

-- AlterTable
ALTER TABLE "agencies" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "agencies" ADD CONSTRAINT "agencies_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
