const Book = require("../models/bookModel");

exports.allBook = async (req, res) => {
    try {
        let books = await Book.GetAllBooks();
        res.status(200).send(books);
    }
    catch (err) {
        res.status(501).send(err);
    }
};

exports.addBook = async (req, res) => {
    const book = new Book({
        title : req.body.title,
        genreId : req.body.genreId,
        description : req.body.description,
        originalTitle : req.body.originalTitle,
        author : req.body.author,
        isbn : req.body.isbn,
        releaseDate : req.body.releaseDate,
        price : req.body.price
    });
    try {
        await Book.AddBook(book);
        res.status(200).send('New book added');
    }
    catch (err) {
        res.status(501).send(err);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.Delete(req.params.id);
        res.status(200).send('Book deleted');
    }
    catch (err) {
        res.status(501).send(err);
    }
};

/*
exports.modifyBook = async (req, res) => {

};
*/

exports.likeBook = async (req, res) => {
    try {
        await Book.Like(req.params.book, req.user.id)
        res.status(200).send('Book liked');
    }
    catch (err) {
        res.status(501).send(err);
    }
};

exports.dislikeBook = async (req, res) => {
    try {
        await Book.Like(req.params.book, req.user.id)
        res.status(200).send('Book disliked');
    }
    catch (err) {
        res.status(501).send(err);
    }
};
