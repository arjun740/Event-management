const express = require('express');
const { body } = require('express-validator');
const userController = require('./../controller/userController')
const authController = require('./../controller/authController')
const router = express.Router();

const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/signup',validateUser,authController.signup);
router.post('/login', authController.login);
// router.post('/users', validateUser, userController.addUser);
router.post('/usernameExistOrNot', userController.checkUsernameExists);
router.post('/emailExistOrNot', userController.checkUsernameExists);



module.exports = router;
