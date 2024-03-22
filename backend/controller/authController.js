const User = require('../model/userModel');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');


const signToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError('Validation failed', 400, errors.array()));
    }
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        console.log(existingUser)
        return next(new AppError('Username or email already exists', 400));
    }

    const newUser = new User({ username, email, password});
    await newUser.save();

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        user_id: newUser._id

    });
});

//------------------------------- Controller to log in a user ------------------------------------------------------------
exports.login = catchAsync(async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return next(new AppError('Validation failed', 400, errors.array()));
    // }
    const { email, password } = req.body;
    console.log(email,password)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new AppError('Invalid email or password', 401));
    }
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect Email or password', 401));
    }
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        user_id :user._id,
    });
});
exports.protect = catchAsync(async (req, res, next) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError(
                'Your are not Logged in! please Logged in to get Access',
                401
            )
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    req.user = currentUser;
    next();
});
