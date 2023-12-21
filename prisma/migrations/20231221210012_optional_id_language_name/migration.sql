-- DropForeignKey
ALTER TABLE "languages" DROP CONSTRAINT "languages_idLanguageName_fkey";

-- AlterTable
ALTER TABLE "languages" ALTER COLUMN "idLanguageName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_idLanguageName_fkey" FOREIGN KEY ("idLanguageName") REFERENCES "languagesName"("id") ON DELETE SET NULL ON UPDATE CASCADE;
