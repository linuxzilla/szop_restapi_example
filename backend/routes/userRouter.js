const userRouter = require('express').Router();
const userController = require('../controllers/userController');

userRouter.post('/login', userController.login);
userRouter.post('/registration', userController.registration);

module.exports = userRouter;