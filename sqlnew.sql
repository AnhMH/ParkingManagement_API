# Add companies
CREATE TABLE `companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `disable` TINYINT(1) NULL DEFAULT 0,
  `created` INT NULL,
  `updated` INT NULL,
  PRIMARY KEY (`id`));

# Add projects
CREATE TABLE `projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NULL,
  `name` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `disable` TINYINT(1) NULL DEFAULT 0,
  `created` INT NULL,
  `updated` INT NULL,
  PRIMARY KEY (`id`));

# Add admin_projects
CREATE TABLE `admin_projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admin_id` INT NULL,
  `company_id` INT NULL,
  `project_id` INT NULL,
  `disable` TINYINT(1) NULL,
  `created` INT NULL,
  `updated` INT NULL,
  PRIMARY KEY (`id`));

# Add orders.project_id
ALTER TABLE `orders` 
ADD COLUMN `project_id` INT NULL DEFAULT 0;

# Add settings.project_id
ALTER TABLE `settings` 
ADD COLUMN `project_id` INT NULL DEFAULT 0,
DROP INDEX `keys_unique` ,
ADD UNIQUE INDEX `keys_unique` (`name` ASC, `admin_type` ASC, `type` ASC, `vehicle_id` ASC, `project_id` ASC);

# Add cards.company_id
ALTER TABLE `cards` 
ADD COLUMN `company_id` INT NULL DEFAULT 0;

# Add monthly_cards.company_id
ALTER TABLE `monthly_cards`
ADD COLUMN `company_id` INT NULL DEFAULT 0;

# Add vehicles.company_id
ALTER TABLE `vehicles` 
ADD COLUMN `company_id` INT NULL DEFAULT 0;

# Add sync
CREATE TABLE `sync` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `project_id` INT NULL DEFAULT 0,
    `company_id` INT NULL DEFAULT 0,
    `admin_id` INT NULL DEFAULT 0,
    `card_id` INT NULL DEFAULT 0,
    `vehicle_id` INT NULL DEFAULT 0,
    `monthly_card_id` INT NULL,
    `type` TINYINT(1) NULL DEFAULT 0 COMMENT '0: Edit\n1: Add new\n2: Delete',
    PRIMARY KEY (`id`));

ALTER TABLE `sync` 
ADD UNIQUE INDEX `monthly_card_id_UNIQUE` (`monthly_card_id` ASC, `project_id` ASC, `admin_id` ASC, `card_id` ASC, `type` ASC, `company_id` ASC, `vehilce_id` ASC);

# Add admin
INSERT INTO `admins` (`id`, `name`, `account`, `password`, `type`, `gender`) VALUES ('-1', 'admin', 'admin', '123456', '-1', '1');

ALTER TABLE `system_logs` 
ADD COLUMN `company_id` INT NULL DEFAULT 0;