class UserNotLoggedIn extends Error {
    constructor(message, type) {
        super(message);
        this.name = "UserNotLoggedIn";
        this.type = type;
    }
}

module.exports.UserNotLoggedIn = UserNotLoggedIn;