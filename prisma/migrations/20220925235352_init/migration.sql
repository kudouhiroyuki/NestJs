/*
  Warnings:

  - You are about to drop the column `createdAt` on the `salesLists` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salesLists` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `createdAt` DATETIME(0) NOT NULL;
