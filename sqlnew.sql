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