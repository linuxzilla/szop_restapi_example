class UsernameAlreadyExists extends Error {
    constructor(message, type) {
        super(message);
        this.name = "UsernameAlreadyExistsError";
        this.type = type;
    }
}

module.exports.UsernameAlreadyExists = UsernameAlreadyExists;