-- AlterTable
ALTER TABLE "agencies" ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "zipCode" TEXT;
