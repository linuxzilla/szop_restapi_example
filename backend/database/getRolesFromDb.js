const db = require("../database/db.js");
const constants = require("./dbConstants");

let userRoles = [];
exports.userRoles = userRoles;

getUserRoles = () => {
    db.query(constants.GET_ROLES, (err, res) => {
        if (err) throw err;
        let tmp = JSON.parse(JSON.stringify(res));
        tmp.forEach(element => userRoles.push(element.role));
        console.log("Roles: %s", userRoles);
    }).catch(err => {
        userRoles = null;
        console.error(err);
    });
}

exports.getUserRoles = getUserRoles;