-- DropForeignKey
ALTER TABLE "adresses" DROP CONSTRAINT "adresses_cityId_fkey";

-- DropForeignKey
ALTER TABLE "agencie_services" DROP CONSTRAINT "agencie_services_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "agencie_services" DROP CONSTRAINT "agencie_services_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "agencies" DROP CONSTRAINT "agencies_addressId_fkey";

-- DropForeignKey
ALTER TABLE "agency_cities" DROP CONSTRAINT "agency_cities_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "agency_cities" DROP CONSTRAINT "agency_cities_cityId_fkey";

-- DropForeignKey
ALTER TABLE "agency_languages" DROP CONSTRAINT "agency_languages_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "agency_languages" DROP CONSTRAINT "agency_languages_languageId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_clientId_fkey";

-- DropForeignKey
ALTER TABLE "comments_agency" DROP CONSTRAINT "comments_agency_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "comments_agency" DROP CONSTRAINT "comments_agency_clientId_fkey";

-- DropForeignKey
ALTER TABLE "languages" DROP CONSTRAINT "languages_idLanguageName_fkey";

-- DropForeignKey
ALTER TABLE "partnerships" DROP CONSTRAINT "partnerships_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "realtor_cities" DROP CONSTRAINT "realtor_cities_cityId_fkey";

-- DropForeignKey
ALTER TABLE "realtor_languages" DROP CONSTRAINT "realtor_languages_languageId_fkey";

-- DropForeignKey
ALTER TABLE "realtor_services" DROP CONSTRAINT "realtor_services_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_clientId_fkey";

-- AddForeignKey
ALTER TABLE "agencies" ADD CONSTRAINT "agencies_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "adresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_services" ADD CONSTRAINT "realtor_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agencie_services" ADD CONSTRAINT "agencie_services_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agencie_services" ADD CONSTRAINT "agencie_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_idLanguageName_fkey" FOREIGN KEY ("idLanguageName") REFERENCES "languagesName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_agency" ADD CONSTRAINT "comments_agency_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_agency" ADD CONSTRAINT "comments_agency_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partnerships" ADD CONSTRAINT "partnerships_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_cities" ADD CONSTRAINT "realtor_cities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency_cities" ADD CONSTRAINT "agency_cities_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency_cities" ADD CONSTRAINT "agency_cities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_languages" ADD CONSTRAINT "realtor_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency_languages" ADD CONSTRAINT "agency_languages_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agency_languages" ADD CONSTRAINT "agency_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
