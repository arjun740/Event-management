const express = require('express');
const { body } = require('express-validator');
const eventController = require('../controller/eventController');
const registrationController = require("../controller/eventRegistrationController");
const {registerForEvent} = require("../controller/eventRegistrationController");
const router = express.Router();
const authController = require('./../controller/authController')
const validateEvent = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('capacity').isNumeric().withMessage('Capacity must be a number'),
    body('registration_deadline').notEmpty().withMessage('Registration deadline is required'),
    body('organizer').notEmpty().withMessage('Organizer is required'),
    body('category').notEmpty().withMessage('Category is required')
];
const validateRegistration = [
    body('user_id').notEmpty().withMessage("User Id is required!"),
    body('event_id').notEmpty().withMessage("Event Id is required!")
]

// EVENT  REGISTRATION
router.post('/eventRegistration',authController.protect,validateRegistration,registrationController.registerForEvent)
    .delete('/eventRegistration',authController.protect,registrationController.deleteEventRegisteredUser)

//EVENTS
router.post('/events', authController.protect,validateEvent, eventController.addEvent)
    .get('/events', authController.protect,eventController.getAllEvents);

module.exports = router;
