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
