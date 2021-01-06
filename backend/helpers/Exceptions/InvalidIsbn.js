class InvalidIsbn extends Error {
    constructor(message, type) {
        super(message);
        this.name = "InvalidIsbn";
        this.type = type;
    }
}

module.exports.EmailAndUsernameAlreadyExists = InvalidIsbn;