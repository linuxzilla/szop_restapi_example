const User = require("../models/userModel");
const config = require("../configs/config.json");
const {NotFoundError} = require("../helpers/NotFoundError");
const {v4: uuidv4} = require('uuid')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const user = await User.login(req.body.username_or_email);
        if (user) {
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(400).send("Wrong Password");
            }
            console.log("New Login: %s", req.body.username_or_email)
            const token = jwt.sign({uuid: user.uuid}, config.tokenSecret);
            await User.UpdateToken(token, user.uuid);
            res.header("auth-token", token).send({
                "userData": {"email": user.email, "username": user.username, "name": user.name}
            });
        }
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(401).send(`Username/Email or Password is wrong`);
        } else {
            let error_data = {
                entity: 'User',
                model_obj: {param: req.params, body: req.body},
                error_obj: err,
                error_msg: err.message
            };
            res.status(500).send({"error_data": error_data});
        }
    }

};

exports.registration = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);
    const newUuid = uuidv4();
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password: hasPassword,
        uuid: newUuid
    });
    try {
        await User.create(user);
        res.status(200).send('New user registered');
    } catch (err) {
        res.status(500).send(err);
    }
};