-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `department_id` VARCHAR(191) NOT NULL,
    `point` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL,
    `update_at` DATETIME(0) NOT NULL,

    INDEX `user_department_id_fkey`(`department_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `department_id` VARCHAR(191) NOT NULL,
    `department_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `department_department_id_key`(`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
