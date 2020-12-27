const router = require('express').Router();
const userController = require('../controllers/userController');

//user
router.post('/login', userController.login);
router.post('/registration', userController.registration);

//books

module.exports = router;