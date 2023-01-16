/*
  Warnings:

  - You are about to drop the `log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesLists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `log`;

-- DropTable
DROP TABLE `posts`;

-- DropTable
DROP TABLE `salesLists`;

-- DropTable
DROP TABLE `stocks`;

-- CreateTable
CREATE TABLE `coupon` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
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
