/*
  Warnings:

  - You are about to drop the column `delivery_address` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `meal_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `meal_title` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `orders` table. All the data in the column will be lost.
  - Added the required column `customerName` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH_ON_DELIVERY');

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_meal_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "delivery_address",
DROP COLUMN "meal_id",
DROP COLUMN "meal_title",
DROP COLUMN "total_amount",
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "mealsId" TEXT,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH_ON_DELIVERY',
ADD COLUMN     "totalAmount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_mealsId_fkey" FOREIGN KEY ("mealsId") REFERENCES "meals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
