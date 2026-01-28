-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_providerId_fkey";

-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "providerProfileId" TEXT;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_providerProfileId_fkey" FOREIGN KEY ("providerProfileId") REFERENCES "providerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
