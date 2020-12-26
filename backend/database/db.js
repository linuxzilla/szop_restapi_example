const mysql = require("mysql");
const config = require("../configs/config.json");

const connection = mysql.createConnection({
    host: config.dbCredentials.host,
    user: config.dbCredentials.user,
    password: config.dbCredentials.password,
    database: config.dbCredentials.database
});

connection.connect(error => {
    if (error) {
        console.error(error);
        console.error("Failed to connect to database")
        throw error;
    }
    console.log("Successfully connected to the database %s.", config.dbCredentials.database);
});
