CREATE TABLE IF NOT EXISTS `credentials` (
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId INT UNSIGNED,
  sessionStart datetime,
  sessionEnd datetime,
  sessionActive bool DEFAULT FALSE,
  FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;