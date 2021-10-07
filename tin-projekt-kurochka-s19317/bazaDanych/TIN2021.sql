CREATE SCHEMA IF NOT EXISTS `TIN2021`;
SET GLOBAL time_zone = '+02:00';
CREATE TABLE IF NOT EXISTS `TIN2021`.`Guest`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `firstName` VARCHAR(50) NOT NULL ,
      `middleName` VARCHAR(50) NOT NULL,
      `lastName` VARCHAR(50) NOT NULL ,
      `pesel` VARCHAR(50) NOT NULL ,
	     `dateOfBirth` DATE NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `guestId_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `TIN2021`.`Room`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `roomNumber` INT NOT NULL,
      `type` VARCHAR(50) NOT NULL,
      `price` DECIMAL(10,2) UNSIGNED NOT NULL ,
      `numberOfPlaces` INT NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `roomid_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `TIN2021`.`Reservation`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `dateFrom` DATE NOT NULL ,
      `dateTo` DATE NULL ,
      `guestId` INT UNSIGNED NOT NULL ,
      `roomId` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `resId_UNIQUE` (`_id` ASC),
      CONSTRAINT `guestfk` FOREIGN KEY (`guestId`) REFERENCES `TIN2021`.`Guest` (`_id`),
      CONSTRAINT `roomfk` FOREIGN KEY (`roomId`) REFERENCES `TIN2021`.`Room` (`_id`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `TIN2021`.`Guest` (`_id`, `firstName`, `lastName`, `pesel`, `dateOfBirth`) VALUES
  (1, 'Jan', 'Kowalski', '810203PPP3K', '1981-02-03'),
  (2, 'Adam', 'Nowak', '761115PPP3K', '1976-11-15')
;

INSERT IGNORE INTO `TIN2021`.`Room` (`_id`, `roomNumber`, `type`,  `price`, `numberOfPlaces`) VALUES
  (1, '225', 'Prezydencki', '700', '4'),
  (2, '312', 'Zwykły', '200', '3')
;

INSERT IGNORE INTO `TIN2021`.`Reservation` (`_id`, `guestId`, `roomId`, `dateFrom`, `dateTo`) VALUES
  (1, 1, 1, '2011-05-21', '2011-06-11'),
  (2, 2, 1, '2012-06-11', '2012-06-21'),
  (3, 1, 2, '2021-01-04', '2021-01-07')
;
