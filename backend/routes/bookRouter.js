const bookRouter = require('express').Router();
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController')

bookRouter.get('/allBook',authController.authenticate, bookController.allBook);

module.exports = bookRouter;