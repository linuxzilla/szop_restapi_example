class UuidAlreadyExist extends Error {
    constructor(message, type) {
        super(message);
        this.name = "UuidAlreadyExistError";
        this.type = type;
    }
}

module.exports.UuidAlreadyExist = UuidAlreadyExist;