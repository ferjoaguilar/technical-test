CREATE DATABASE `technical_test`;

USE `technical_test`;

CREATE TABLE `users`(
	`id_user` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `fullname` VARCHAR(150) NOT NULL,
    `username` VARCHAR(24) NOT NULL UNIQUE,
    `password` TEXT NOT NULL
);

CREATE TABLE `beneficiaries`(
	`id_beneficiary` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `fullname` VARCHAR(150) NOT NULL,
    `hampers` BOOLEAN,
    `id_user` iNT NOT NULL,
    `age` INT NOT NULL,
    `gender` ENUM('F', 'M'),
    `delivered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`id_user`) REFERENCES `users`(id_user)
);