-- CreateEnum
CREATE TYPE "Fluency" AS ENUM ('BASIC', 'INTERMEDIARY', 'FLUENT', 'NATIVE');

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realtors" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "introduction" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "professional_email" TEXT,
    "website" TEXT,

    CONSTRAINT "realtors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agencies" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "professional_email" TEXT,
    "website" TEXT,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "agencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "realtorId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "realtorId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "awards" (
    "id" SERIAL NOT NULL,
    "realtorId" INTEGER,

    CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partnerships" (
    "id" SERIAL NOT NULL,
    "init" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT false,
    "realtorId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "partnerships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "realtorId" INTEGER,
    "agencyId" INTEGER,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adresses" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT NOT NULL,

    CONSTRAINT "adresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realtor_cities" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "realtorId" INTEGER NOT NULL,

    CONSTRAINT "realtor_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agency_cities" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "agency_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realtor_languages" (
    "id" SERIAL NOT NULL,
    "realtorId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "fluency" "Fluency" NOT NULL,

    CONSTRAINT "realtor_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agency_languages" (
    "id" SERIAL NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "agency_languages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "realtors_email_key" ON "realtors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agencies_email_key" ON "agencies"("email");

-- AddForeignKey
ALTER TABLE "agencies" ADD CONSTRAINT "agencies_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "awards" ADD CONSTRAINT "awards_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partnerships" ADD CONSTRAINT "partnerships_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partnerships" ADD CONSTRAINT "partnerships_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_cities" ADD CONSTRAINT "realtor_cities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_cities" ADD CONSTRAINT "realtor_cities_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency_cities" ADD CONSTRAINT "agency_cities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency_cities" ADD CONSTRAINT "agency_cities_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_languages" ADD CONSTRAINT "realtor_languages_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_languages" ADD CONSTRAINT "realtor_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency_languages" ADD CONSTRAINT "agency_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency_languages" ADD CONSTRAINT "agency_languages_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
