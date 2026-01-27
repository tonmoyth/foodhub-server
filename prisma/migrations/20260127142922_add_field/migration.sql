/*
  Warnings:

  - A unique constraint covering the columns `[cat_code]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cat_code` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "cat_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_cat_code_key" ON "categories"("cat_code");
