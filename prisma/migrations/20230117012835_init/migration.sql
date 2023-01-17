-- CreateTable
CREATE TABLE `system_infomation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `publish_scope` ENUM('CONSUMER', 'BACKOFFICE') NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `body` VARCHAR(400) NOT NULL,
    `publish_datetime` BIGINT NOT NULL,
    `publish_limit` BIGINT NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
