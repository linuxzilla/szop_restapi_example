CREATE TABLE IF NOT EXISTS `books` (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  genreId INT UNSIGNED,
  isbn varchar(255) NOT NULL UNIQUE,
  title varchar(255) NOT NULL,
  originalTitle varchar(255) NOT NULL ,
  releaseDate date NOT NULL,
  author varchar(255) NOT NULL,
  description text,
  price DOUBLE NOT NULL,
  likes INT UNSIGNED DEFAULT '0',
  dislikes INT UNSIGNED DEFAULT '0',
  FOREIGN KEY (genreId) REFERENCES genres(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;