module.exports = {
    GET_ROLES : "SELECT role FROM roles",
    CHECK_USER_EMAIL_IS_EXIST : "SELECT * FROM users WHERE username = ? OR email = ? ",
    ADD_NEW_USER_CHECK_USER_EMAIL_IS_EXIST: "SELECT username, email FROM users WHERE username = ? OR email = ?",
    CHECK_UUID_IS_EXIST : "SELECT COUNT(id) AS iDs FROM users WHERE uuid = ?",
    ADD_NEW_USER : "insert into users SET email = ?, username = ?, password = ?, name = ?, uuid = ?"
}