const db = require("../database/db.js");
const constants = require("../database/dbConstants");
const {EmailAndUsernameAlreadyExists} = require("../helpers/Exceptions/EmailAndUsernameAlreadyExists");
const { NotFoundError } = require("../helpers/Exceptions/NotFoundError");
const { EmailAlreadyExists } = require("../helpers/Exceptions/EmailAlreadyExists");
const { UsernameAlreadyExists } = require("../helpers/Exceptions/UsernameAlreadyExists");
const { UuidAlreadyExist } = require("../helpers/Exceptions/UuidAlreadyExist");
const { InvalidToken } = require("../helpers/Exceptions/InvalidToken");
const { UserNotLoggedIn } = require("../helpers/Exceptions/UserNotLoggedIn")

const UserModel = function(user) {
    if( typeof user.id != 'undefined' ) {
        this.id = user.id;
    }
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    if( typeof user.roleId != 'undefined' ) {
        this.roleId = user.roleId;
    }
    this.uuid = user.uuid;
    this.sessionToken = user.sessionToken;
    this.userLoggedIn = user.userLoggedIn;
};

UserModel.login = async (value) => {
    let tmp = await db.query(constants.CHECK_USER_EMAIL_IS_EXIST, [value, value]);
    if( tmp.length ) {
        return tmp[0];
    }
    else {
        throw new NotFoundError("User does not exist");
    }
};

UserModel.logout = async (value) => {
    await db.query(constants.LOGOUT,value);
};

UserModel.create = async (value) => {
    let tmp = await db.query(constants.ADD_NEW_USER_CHECK_USER_EMAIL_IS_EXIST, [value.username, value.email]);
    if( tmp.length ) {
        let emailExits = tmp.filter(x => x.email === value.email);
        let usernameExits = tmp.filter(x => x.username === value.username);
        if (emailExits.length > 0 && usernameExits.length > 0) {
            throw new EmailAndUsernameAlreadyExists("Username and email address already exist");
        }
        else if (usernameExits.length > 0) {
           throw new UsernameAlreadyExists("Username already exist");
        }
        else {
            throw new EmailAlreadyExists("Email address already exist");
        }
    }
    tmp = await db.query(constants.CHECK_UUID_IS_EXIST, value.email);
    if (tmp[0].iDs) {
        throw new UuidAlreadyExist();
    }
    await db.query(constants.ADD_NEW_USER, [value.email, value.username, value.password,value.name, value.uuid]);
};

UserModel.UpdateToken = async (token, uuid) => {
    await db.query(constants.SET_SESSION_TOKEN_LOGIN,[token, uuid]);
};

UserModel.ValidateSessionToken = async (token, uuid) => {
    let returnValue = {
        roleId : null,
        id : null
    }
    let tmp = await db.query(constants.GET_UUID, uuid);
    if (tmp[0].userLoggedIn !== 1) {
        throw new UserNotLoggedIn();
    }
    if (tmp[0].sessionToken !== token) {
        throw new InvalidToken();
    }
    returnValue.roleId = tmp[0].roleId;
    returnValue.id = tmp[0].id;
    return returnValue;
};

module.exports = UserModel;
