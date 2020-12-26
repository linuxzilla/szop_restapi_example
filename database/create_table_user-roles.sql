CREATE TABLE IF NOT EXISTS `user_roles` (
    `userId` INT UNSIGNED NOT NULL,
    `roleId` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`userId`, `roleId`),
    CONSTRAINT `Constr_CourseMembership_User_fk`
        FOREIGN KEY `User_fk` (`userId`) REFERENCES `users` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Constr_CourseMembership_Role_fk`
        FOREIGN KEY `Role_fk` (`roleId`) REFERENCES `roles` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;