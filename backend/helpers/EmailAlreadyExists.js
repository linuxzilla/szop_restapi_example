class EmailAlreadyExists extends Error {
    constructor(message, type) {
        super(message);
        this.name = "EmailAlreadyExistsError";
        this.type = type;
    }
}

module.exports.EmailAlreadyExists = EmailAlreadyExists;