-- CreateTable
CREATE TABLE `departments` (
    `department_id` VARCHAR(191) NOT NULL,
    `department_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `departments_department_id_key`(`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
