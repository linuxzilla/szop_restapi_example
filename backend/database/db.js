const mysql = require("mysql");
const config = require("../configs/config.json");
const util = require('util')

const db = mysql.createConnection({
    host: config.dbCredentials.host,
    user: config.dbCredentials.user,
    password: config.dbCredentials.password,
    database: config.dbCredentials.database,
    insecureAuth : true
});

db.connect(error => {
    if (error) {
        console.error(error);
        console.error("Failed to connect to database")
        throw error;
    }
    console.log("Successfully connected to the database %s.", config.dbCredentials.database);
});

db.query = util.promisify(db.query);

module.exports = db;