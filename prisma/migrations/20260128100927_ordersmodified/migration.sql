/*
  Warnings:

  - You are about to drop the column `providerId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `providerProfileId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_providerId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "providerId",
ADD COLUMN     "providerProfileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_providerProfileId_fkey" FOREIGN KEY ("providerProfileId") REFERENCES "providerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
