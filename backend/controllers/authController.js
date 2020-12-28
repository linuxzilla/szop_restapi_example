const config = require("../configs/config.json");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
        await User.ValidateSessionToken(token, tokenData.uuid);
        req.user = token;
        console.log(req.user)
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}