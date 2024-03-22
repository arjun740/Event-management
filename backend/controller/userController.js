const { validationResult } = require('express-validator');
const User = require('./../model/userModel')
const AppError = require('../util/appError');
const catchAsync = require('./../util/catchAsync')

exports.addUser =catchAsync( async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError('Validation failed', 400, errors.array()));
        }
        const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
        if (existingUser) {
            new AppError('Username or email already exists', 400);
        }
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        await newUser.save();
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
})

///////////// check username and email is exist or not
exports.checkUsernameExists = catchAsync(async (req, res, next) => {
    const { username } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(404).json({
            status: 'fail',
            message: 'Username does not exist'
        });
    } else {
        return res.status(200).json({
            status: 'success',
            message: 'Username exists'
        });
    }
});
exports.checkEmailExists = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(404).json({
            status: 'fail',
            message: 'Email exists'
        });
    } else {
        return res.status(404).json({
            status: 'success',
            message: 'Email does not exist'
        });
    }
});