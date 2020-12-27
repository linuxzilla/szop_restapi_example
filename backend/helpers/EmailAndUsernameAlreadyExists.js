class EmailAndUsernameAlreadyExists extends Error {
    constructor(message, type) {
        super(message);
        this.name = "EmailAndUsernameAlreadyExistsError";
        this.type = type;
    }
}

module.exports.EmailAndUsernameAlreadyExists = EmailAndUsernameAlreadyExists;