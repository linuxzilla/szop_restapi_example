const db = require("../database/db");
const constants = require("../database/dbConstants");
const ISBN = require( 'isbn-validate' );
const { InvalidIsbn } = require("../helpers/Exceptions/InvalidIsbn");

const BookModel = function(book) {
    if( typeof book.id != 'undefined' ) {
        this.id = book.id;
    }
    this.isbn = book.isbn;
    this.title = book.title;
    this.originalTitle = book.originalTitle;
    this.releaseDate = book.releaseDate;
    this.author = book.author;
    this.description = book.description;
    this.price = book.price;
    this.genreId = book.genreId;
};

BookModel.GetAllBooks = async () => {
    let tmp = await db.query(constants.GET_ALL_BOOKS);
    return tmp;
};

BookModel.GetBookById = async (value) => {
  let tmp = await db.query(constants.GET_BOOK, value);
  return tmp[0];
};

BookModel.AddBook = async (value) => {
    if (ISBN.Validate(value.isbn.replace(/-/g, ""))) {
        throw new InvalidIsbn;
    }
    await db.query(constants.ADD_BOOK, [value.title, value.genreId, value.description,
    value.originalTitle, value.author, value.isbn, value.releaseDate, value.price]);
};

BookModel.Like = async (bookId, userId) => {
    let tmp = await db.query(constants.BOOK_ALREADY_LIKED, [bookId, userId]);
    if( tmp.length ) {
        await db.query(constants.DELETE_LIKE, tmp[0].id);
    }
    else {
        tmp = await db.query(constants.BOOK_ALREADY_DISLIKED, [bookId, userId]);
        if( tmp.length ) {
            await db.query(constants.DELETE_DISLIKE, tmp[0].id);
        }
        await db.query(constants.LIKE_BOOK, [bookId, userId])
    }
};

BookModel.Dislike = async (bookId, userId) => {
    let tmp = await db.query(constants.BOOK_ALREADY_DISLIKED, [bookId, userId]);
    if( tmp.length ) {
        await db.query(constants.DELETE_DISLIKE, tmp[0].id);
    }
    else {
        tmp = await db.query(constants.BOOK_ALREADY_LIKED, [bookId, userId]);
        if( tmp.length ) {
            await db.query(constants.DELETE_LIKE, tmp[0].id);
        }
        await db.query(constants.DISLIKE_BOOK, [bookId, userId])
    }
};

BookModel.Delete = async (value) => {
    await db.query(constants.DELETE_BOOK, value);
    await db.query(constants.DELETE_DISLIKE_BY_BOOKID, value);
    await db.query(constants.DELETE_LIKE_BY_BOOKID, value);
}

module.exports = BookModel;
