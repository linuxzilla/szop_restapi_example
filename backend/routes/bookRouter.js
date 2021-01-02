const bookRouter = require('express').Router();
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController')

bookRouter.get('/',authController.authenticate, bookController.allBook);
bookRouter.put('/like/:book', authController.authenticate, bookController.likeBook);
bookRouter.put('/dislike/:book', authController.authenticate, bookController.dislikeBook);
bookRouter.put('/book/:id', authController.authenticate, bookController.dislikeBook);

bookRouter.post('/add',authController.authenticate, authController.adminOnly, bookController.allBook);
bookRouter.delete('/delete/:id',authController.authenticate, authController.adminOnly, bookController.deleteBook);
//bookRouter.put('/modify/:id',authController.authenticate, authController.adminOnly, bookController.modifyBook);

module.exports = bookRouter;