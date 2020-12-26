CREATE TABLE IF NOT EXISTS `book_genre` (
    `bookId` INT UNSIGNED NOT NULL,
    `genreId` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`bookId`, `genreId`),
    CONSTRAINT `Constr_CourseMembership_Books_fk`
        FOREIGN KEY `Book_fk` (`bookId`) REFERENCES `books` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Constr_CourseMembership_Genre_fk`
        FOREIGN KEY `Genre_fk` (`genreId`) REFERENCES `genres` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;