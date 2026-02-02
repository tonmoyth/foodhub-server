/*
  Warnings:

  - You are about to drop the column `cat_code` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `categories` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "categories_cat_code_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "cat_code",
DROP COLUMN "icon";
