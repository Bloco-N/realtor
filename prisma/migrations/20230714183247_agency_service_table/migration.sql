-- CreateTable
CREATE TABLE "agencie_services" (
    "id" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "agencie_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agencie_services_id_key" ON "agencie_services"("id");

-- AddForeignKey
ALTER TABLE "agencie_services" ADD CONSTRAINT "agencie_services_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agencie_services" ADD CONSTRAINT "agencie_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
