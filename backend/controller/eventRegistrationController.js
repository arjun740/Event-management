const catchAsync = require('./../util/catchAsync')
const AppError = require('./../util/AppError')
const Registration = require('../model/registrationModel');
const User = require('../model/userModel');
const Event = require('../model/eventModel');
exports.registerForEvent = catchAsync(async (req,res,next) => {

    const user = await User.findById(req.user['_id']);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    const event = await Event.findById(req.body.event_id);
    if (!event) {
        return next(new AppError('Event not found', 404));
    }
    const existingRegistration = await Registration.findOne({
        user_id:req.user['_id'],
        event_id: req.body.event_id
    });
    if (existingRegistration) {
        throw new AppError('User is already registered for the event', 400);
    }
    const newRegistration = new Registration({
        user_id: req.user['_id'],
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