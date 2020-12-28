class InvalidToken extends Error {
    constructor(message, type) {
        super(message);
        this.name = "InvalidTokenError";
        this.type = type;
    }
}

module.exports.InvalidToken = InvalidToken;