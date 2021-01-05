CREATE TABLE IF NOT EXISTS `user_roles` (
    `userId` INT UNSIGNED NOT NULL,
    `genreId` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`userId`, `genreId`),
    CONSTRAINT `Constr_CourseMembership_User_fk`
        FOREIGN KEY `User_fk` (`userId`) REFERENCES `users` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Constr_CourseMembership_Genre_fk`
        FOREIGN KEY `Genre_fk` (`genreId`) REFERENCES `genres` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;