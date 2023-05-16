-- AlterTable
ALTER TABLE "agencies" ADD COLUMN     "phoneCountry" TEXT,
ADD COLUMN     "wppCountry" TEXT;

-- AlterTable
ALTER TABLE "realtors" ADD COLUMN     "phoneCountry" TEXT,
ADD COLUMN     "wppCountry" TEXT;
