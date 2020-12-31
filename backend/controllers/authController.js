const config = require("../configs/config.json");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const roles = require("../helpers/userRoles");

exports.authenticate = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).send("Unauthenticated session");
    }
    try {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        const tokenData = jwt.verify(token, config.tokenSecret);
        req.role = await User.ValidateSessionToken(token, tokenData.uuid);
        next();
    }
    catch (err) {
        res.status(400).send("Invalid token");
    }
};

exports.adminOnly = (req, res, next) => {
    if (req.roleId !== roles.admin) {
        res.status(403).send("Access denied");
    }
    else {
        next();
    }
};