const Book = require("../models/bookModel");
const config = require("../configs/config.json");
const {NotFoundError} = require("../helpers/NotFoundError");
const {v4: uuidv4} = require('uuid')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.allBook = async (req, res) => {
    try {
        let books = await Book.GetAllBooks();
        res.status(200).send(books);
    } catch (err) {
        res.status(501).send(err);
    }
}