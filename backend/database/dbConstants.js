module.exports = {
    GET_ROLES : "SELECT role FROM roles",
    CHECK_USER_EMAIL_IS_EXIST : "SELECT * FROM users WHERE username = ? OR email = ?;",
    ADD_NEW_USER_CHECK_USER_EMAIL_IS_EXIST: "SELECT username, email FROM users WHERE username = ? OR email = ?;",
    CHECK_UUID_IS_EXIST : "SELECT COUNT(id) AS iDs FROM users WHERE uuid = ?;",
    ADD_NEW_USER : "insert into users SET email = ?, username = ?, password = ?, name = ?, uuid = ?;",
    GET_UUID : "SELECT id, roleId, sessionToken, userLoggedIn FROM users WHERE uuid = ?;",
    SET_SESSION_TOKEN_LOGIN: "UPDATE users SET sessionToken = ?, userLoggedIn = TRUE WHERE uuid=?;",
    LOGOUT: "UPDATE users SET userLoggedIn = FALSE WHERE id=?",
    GET_ALL_BOOKS : "SELECT books.*," +
        "(SELECT COUNT(bookId) FROM user_likes INNER JOIN szop.users ON users.id = user_likes.userId where bookId = books.id)" +
        "As 'likes'," +
        "(SELECT COUNT(bookId) FROM user_dislikes INNER JOIN szop.users ON users.id = user_dislikes.userId where bookId = books.id)" +
        "AS 'dislikes' " +
        "from books;",
    GET_BOOK : "SELECT books.*," +
        "(SELECT COUNT(bookId) FROM user_likes INNER JOIN szop.users ON users.id = user_likes.userId where bookId = books.id)" +
        "As 'likes'," +
        "(SELECT COUNT(bookId) FROM user_dislikes INNER JOIN szop.users ON users.id = user_dislikes.userId where bookId = books.id)" +
        "AS 'dislikes' " +
        "from books where books.id = ?;",
    ADD_BOOK : "insert into books SET title = ?, genreId = ?, description = ?, originalTitle = ?, author= ?, isbn = ?, releaseDate = ?, price = ?;",
    LIKE_BOOK : "INSERT INTO user_likes SET bookId = ?, userId = ?;",
    DISLIKE_BOOK : "INSERT INTO user_dislikes SET bookId = ?, userId = ? ;",
    GET_USER_LIKED_BOOKS : "SELECT * FROM books INNER JOIN user_likes ON books.id = user_likes.bookId where userId = ?;",
    GET_USER_DISLIKED_BOOKS : "SELECT * FROM books INNER JOIN user_dislikes ON books.id = user_likes.bookId where userId = ?;",
    BOOK_ALREADY_LIKED : "SELECT id FROM user_likes where bookId = ? AND userId = ?;",
    BOOK_ALREADY_DISLIKED : "SELECT id FROM user_dislikes where bookId = ? AND userId = ?;",
    DELETE_LIKE : "DELETE from user_likes where id=?;",
    DELETE_DISLIKE : "DELETE from user_dislikes where id=?;",
    DELETE_BOOK : "DELETE from books where id=?;",
    DELETE_DISLIKE_BY_BOOKID : "DELETE from user_dislikes where bookId = ?;",
    DELETE_LIKE_BY_BOOKID : "DELETE from user_likes where bookId = ?;"
};