-- DropIndex
DROP INDEX "agencie_services_id_key";

-- AlterTable
CREATE SEQUENCE agencie_services_id_seq;
ALTER TABLE "agencie_services" ALTER COLUMN "id" SET DEFAULT nextval('agencie_services_id_seq');
ALTER SEQUENCE agencie_services_id_seq OWNED BY "agencie_services"."id";
