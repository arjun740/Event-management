const catchAsync = require('./../util/catchAsync')
const AppError = require('./../util/AppError')
const Registration = require('../model/registrationModel');
const User = require('../model/userModel');
const Event = require('../model/eventModel');
const { validationResult } = require('express-validator');
exports.registerForEvent = catchAsync(async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError('Validation failed', 400, errors.array()));
    }
    const user = await User.findById(req.body.user_id);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    const event = await Event.findById(req.body.event_id);
    if (!event) {
        return next(new AppError('Event not found', 404));
    }
    const existingRegistration = await Registration.findOne({
        user_id: req.body.user_id,
        event_id: req.body.event_id
    });
    if (existingRegistration) {
        throw new AppError('User is already registered for the event', 400);
    }
    const newRegistration = new Registration({
        user_id: req.body.user_id,
        event_id: req.body.event_id
    });
    await newRegistration.save();
    res.status(201).json({
        status: 'success',
        data: {
            registration: newRegistration
        }
    });
})

exports.deleteEventRegisteredUser = catchAsync(async (req,res,next) =>{
    const eventRegistration = await Registration.findByIdAndDelete(req.params.id);
    if(!eventRegistration) {
        return next(new AppError('No tour found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
})