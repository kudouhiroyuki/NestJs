-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `department_id` VARCHAR(191) NOT NULL,
    `point` INTEGER NULL,
    `created_at` DATETIME(0) NOT NULL,
    `update_at` DATETIME(0) NOT NULL,

    INDEX `users_department_id_fkey`(`department_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `department_id` VARCHAR(191) NOT NULL,
    `department_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `departments_department_id_key`(`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupon` (
    `id` INTEGER UNSIGNED NOT NULL,
    `coupon_name` VARCHAR(50) NOT NULL,
    `discount_value` INTEGER NOT NULL,
    `enable_element` ENUM('PERIOD', 'TERM') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticketing_coupon` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `coupon_id` INTEGER UNSIGNED NOT NULL,
    `coupon_code` VARCHAR(16) NOT NULL,
    `member_id` INTEGER UNSIGNED NOT NULL,
    `enable_from_limit_datetime` BIGINT NOT NULL,
    `enable_to_limit_datetime` BIGINT NOT NULL,
    `enable_limit_date` BIGINT NOT NULL,
    `coupon_status` ENUM('UNUSED', 'USED', 'CANCELED', 'EXPIRED') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
