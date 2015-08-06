SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema webappdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `webappdb` DEFAULT CHARACTER SET utf8 ;
USE `webappdb` ;

-- -----------------------------------------------------
-- Table `webappdb`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webappdb`.`activity` (
  `ActivityId` INT(11) NOT NULL AUTO_INCREMENT,
  `Message` VARCHAR(200) NULL DEFAULT NULL,
  `Username` VARCHAR(45) NULL DEFAULT NULL,
  `Time` VARCHAR(45) NULL DEFAULT NULL,
  `Ip` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`ActivityId`),
  UNIQUE INDEX `ActivityId_UNIQUE` (`ActivityId` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webappdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webappdb`.`user` (
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `Balance` INT(11) NOT NULL,
  `ProfilePic` VARCHAR(100) NULL DEFAULT NULL,
  `EncodedUsername` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC),
  UNIQUE INDEX `EncodedUsername_UNIQUE` (`EncodedUsername` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `webappdb`.`books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `webappdb`.`books` (
  `BookId` INT(11) NOT NULL AUTO_INCREMENT,
  `BookName` VARCHAR(45) NULL DEFAULT NULL,
  `BookImage` VARCHAR(500) NULL DEFAULT NULL,
  `BookPrice` INT(11) NULL DEFAULT NULL,
  `Username` VARCHAR(45) NULL DEFAULT NULL,
  `ForSale` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_bin' NULL DEFAULT NULL,
  PRIMARY KEY (`BookId`),
  UNIQUE INDEX `bookId_UNIQUE` (`BookId` ASC),
  INDEX `Username_idx` (`Username` ASC),
  CONSTRAINT `Username`
    FOREIGN KEY (`Username`)
    REFERENCES `webappdb`.`user` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10000
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
