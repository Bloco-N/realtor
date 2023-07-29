-- CreateTable
CREATE TABLE "comments_agency" (
    "id" SERIAL NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "marketExpertiseRating" DOUBLE PRECISION NOT NULL,
    "responsivenessRating" DOUBLE PRECISION NOT NULL,
    "negotiationSkillsRating" DOUBLE PRECISION NOT NULL,
    "profissionalismAndComunicationRating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "comments_agency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments_agency" ADD CONSTRAINT "comments_agency_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_agency" ADD CONSTRAINT "comments_agency_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
