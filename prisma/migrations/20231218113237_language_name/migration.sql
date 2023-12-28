/*
  Warnings:

  - Added the required column `idLanguageName` to the `languages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "languages" ADD COLUMN     "idLanguageName" INTEGER;

-- CreateTable
CREATE TABLE "languagesName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languagesName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "languagesName_name_key" ON "languagesName"("name");

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_idLanguageName_fkey" FOREIGN KEY ("idLanguageName") REFERENCES "languagesName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
