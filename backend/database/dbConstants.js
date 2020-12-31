module.exports = {
    GET_ROLES : "SELECT role FROM roles",
    CHECK_USER_EMAIL_IS_EXIST : "SELECT * FROM users WHERE username = ? OR email = ?;",
    ADD_NEW_USER_CHECK_USER_EMAIL_IS_EXIST: "SELECT username, email FROM users WHERE username = ? OR email = ?;",
    CHECK_UUID_IS_EXIST : "SELECT COUNT(id) AS iDs FROM users WHERE uuid = ?;",
    ADD_NEW_USER : "insert into users SET email = ?, username = ?, password = ?, name = ?, uuid = ?;",
    GET_UUID : "SELECT roleId, sessionToken, userLoggedIn FROM users WHERE uuid = ?;",
    SET_SESSION_TOKEN_LOGIN: "UPDATE users SET sessionToken = ?, userLoggedIn = TRUE WHERE uuid=?;",
    LOGOUT: "UPDATE users SET userLoggedIn = FALSE WHERE id=?",
    GET_ALL_BOOKS : "SELECT * FROM books;"
};