const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

userRouter.post('/login', userController.login);
userRouter.post('/registration', userController.registration);
userRouter.post('/logout', authController.authenticate, userController.logout)

module.exports = userRouter;