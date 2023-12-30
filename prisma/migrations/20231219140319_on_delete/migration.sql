-- DropForeignKey
ALTER TABLE "awards" DROP CONSTRAINT "awards_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "partnerships" DROP CONSTRAINT "partnerships_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "realtor_cities" DROP CONSTRAINT "realtor_cities_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "realtor_languages" DROP CONSTRAINT "realtor_languages_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "realtor_services" DROP CONSTRAINT "realtor_services_realtorId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_realtorId_fkey";

-- AddForeignKey
ALTER TABLE "realtor_services" ADD CONSTRAINT "realtor_services_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "awards" ADD CONSTRAINT "awards_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partnerships" ADD CONSTRAINT "partnerships_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_cities" ADD CONSTRAINT "realtor_cities_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_languages" ADD CONSTRAINT "realtor_languages_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
