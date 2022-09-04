/*
  Warnings:

  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `logs`;

-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `log` VARCHAR(191) NOT NULL,
    `dt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
