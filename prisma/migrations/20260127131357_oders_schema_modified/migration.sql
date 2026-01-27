/*
  Warnings:

  - Added the required column `meal_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_title` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "meal_id" TEXT NOT NULL,
ADD COLUMN     "meal_title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
