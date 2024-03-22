/*
  Warnings:

  - Added the required column `maxBranches` to the `Plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Plans` ADD COLUMN `maxBranches` INTEGER NOT NULL;
