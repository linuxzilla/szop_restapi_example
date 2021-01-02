CREATE TABLE IF NOT EXISTS `user_dislikes` (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `userId` INT UNSIGNED NOT NULL,
    `bookId` INT UNSIGNED NOT NULL,
    CONSTRAINT `Constr_CourseMembership_User_fk_Dislike`
        FOREIGN KEY `User_fk` (`userId`) REFERENCES `users` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Constr_CourseMembership_Book_fk_Dislike`
        FOREIGN KEY `Book_fk` (`bookId`) REFERENCES `books` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;