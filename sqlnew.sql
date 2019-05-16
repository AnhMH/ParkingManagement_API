# Add companies
CREATE TABLE `pm`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `disable` TINYINT(1) NULL DEFAULT 0,
  `created` INT NULL,
  `updated` INT NULL,
  PRIMARY KEY (`id`));

# Add projects
CREATE TABLE `pm`.`projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NULL,
  `name` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `disable` TINYINT(1) NULL DEFAULT 0,
  `created` INT NULL,
  `updated` INT NULL,
  PRIMARY KEY (`id`));

# Add admin_projects
CREATE TABLE `pm`.`admin_projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admin_id` INT NULL,
  `company_id` INT NULL,
  `project_id` INT NULL,
  `disable` TINYINT(1) NULL,
  `created` INT NULL,
  `updated` INT NULL,
  PRIMARY KEY (`id`));

