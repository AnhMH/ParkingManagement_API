#Add companies
CREATE TABLE `pm`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `disable` TINYINT(1) NULL,
  `created` INT NULL,
  `updated` INT NULL,
  PRIMARY KEY (`id`));

