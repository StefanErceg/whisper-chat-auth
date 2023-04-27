-- MySQL Script generated by MySQL Workbench
-- четвртак, 27. април 2023. 00:21:46 CEST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema whisper_chat
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `whisper_chat` ;

-- -----------------------------------------------------
-- Schema whisper_chat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `whisper_chat` ;
USE `whisper_chat` ;

-- -----------------------------------------------------
-- Table `whisper_chat`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `whisper_chat`.`user` (
  `id` VARCHAR(255) NOT NULL DEFAULT (UUID()),
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `banned` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `whisper_chat`.`attack_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `whisper_chat`.`attack_log` (
  `id` VARCHAR(255) NOT NULL DEFAULT (UUID()),
  `description` VARCHAR(255) NULL,
  `timestamp` VARCHAR(45) NULL DEFAULT 'CURRENT_TIMESTAMP',
  `user_id` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_log_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_log_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `whisper_chat`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
