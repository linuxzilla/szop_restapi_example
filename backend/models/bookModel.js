const db = require("../database/db");
const constants = require("../database/dbConstants");

const BookModel = function(book) {
    if( typeof book.id != 'undefined' ) {
        this.id = book.id;
    }
    this.isbn = book.isbn;
    this.title = book.title;
    this.releaseDate = book.releaseDate;
    this.author = book.author;
    if( typeof book.description != 'undefined' ) {
        this.description = book.description;
    }
    this.price = book.price;
    this.likes = book.likes;
    this.dislikes = book.dislikes;
};

BookModel.GetAllBooks = async () => {
    let tmp = await db.query(constants.GET_ALL_BOOKS);
    return tmp;
}

module.exports = BookModel;
