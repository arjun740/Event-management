const catchAsync = require('../util/catchAsync');
const Event = require('../model/eventModel');
const { validationResult } = require('express-validator');
const AppError = require('../util/appError');
const APIFeatures = require('./../util/APIfeature');

exports.addEvent = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError('Validation failed', 400, errors.array()));
    }
    const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        capacity: req.body.capacity,
        registration_deadline: req.body.registration_deadline,
        organizer: req.body.organizer,
        category: req.body.category
    });
    await newEvent.save();
    res.status(201).json({
        status: 'success',
        data: {
            event: newEvent
        }
    });
});
exports.getAllEvents = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Event.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const events = await features.query;
    if (!events.length) {
        return next(new AppError('No events found', 404));
    }

    res.status(200).json({
        status: 'success',
        results: events.length,
        data: {
            events
        }
    });
});

exports.eventLocaions = catchAsync(async (req,res,next) => {
    const location = await Event.distinct('location');
    if(!location) return next(new AppError("location not Found",404));
    res.status(200).json({
        status :"success",
        location
    })
})

exports.autoComplete = catchAsync(async (req, res, next) => {
    const searchString = req.query.searchString;
    const suggestions = await Event.find({ title: { $regex: '^' + searchString, $options: 'i' } })
        .select('title')
        .limit(10);
    res.status(200).json({
        status: "success",
        suggestions
    });
});

exports.getEvent = catchAsync(async (req,res,next ) => {
    const id = req.params.id
    const event = await Event.findById(id);
    if(!event) return next(new AppError("Could not able to Found a Event with given ID",404))
    res.status(200).json({
        status: "success",
        event
    });
})