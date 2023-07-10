-- AlterTable
ALTER TABLE "agencies" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
