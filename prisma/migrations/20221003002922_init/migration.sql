-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `departmentId` VARCHAR(191) NOT NULL,
    `point` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `departmentId` VARCHAR(191) NOT NULL,
    `departmentName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `departments_departmentId_key`(`departmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `log` VARCHAR(191) NOT NULL,
    `dt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salesLists` (
    `name` VARCHAR(191) NOT NULL,
    `sales` INTEGER NOT NULL,

    UNIQUE INDEX `salesLists_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stocks` (
    `name` VARCHAR(191) NOT NULL,
    `stockCount` INTEGER NOT NULL,

    UNIQUE INDEX `stocks_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
