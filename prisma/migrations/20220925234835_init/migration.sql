/*
  Warnings:

  - Added the required column `createdAt` to the `salesLists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salesLists` ADD COLUMN `createdAt` DATETIME(0) NOT NULL;
