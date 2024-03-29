const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    registration_deadline: {
        type: Date,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ['conference', 'workshop', 'seminar', 'concert', 'exhibition', 'other'],
        default: 'other'
    },image: {
        type: String, // Assuming image is stored as a URL
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
eventSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});
const Event = mongoose.model('Event', eventSchema);

const initialEvents = [
    {
        title: 'AI Conference',
        description: 'This is a sample conference description.',
        date: new Date('2024-04-25T08:00:00.000Z'),
        location: 'London',
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        capacity: 100,
        registration_deadline: new Date('2024-04-10T00:00:00.000Z'), // Corrected date format
        organizer: '65fbccac769984fe46c830a1',
        category: 'conference'
    },
    {
        title: 'AI Workshop',
        description: 'This is a sample workshop description.',
        date: new Date('2024-04-19T08:00:00.000Z'),
        location: 'New York',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        capacity: 150,
        registration_deadline: new Date('2024-04-11T00:00:00.000Z'), // Corrected date format
        organizer: '65fbccac769984fe46c830a1',
        category: 'workshop'
    },
    {
        title: 'AI Seminar',
        description: 'This is a sample seminar description.',
        date: new Date('2024-04-20T08:00:00.000Z'),
        location: 'Chennai',
        capacity: 120,
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXZlbnR8ZW58MHx8MHx8fDA%3D',
        registration_deadline: new Date('2024-04-12T00:00:00.000Z'), // Corrected date format
        organizer: '65fbccac769984fe46c830a1',
        category: 'seminar'
    },
    {
        title: 'dua Lipa concert',
        description: 'This is a sample social gathering description.',
        date: new Date('2024-04-21T08:00:00.000Z'),
        location: 'Paris',
        capacity: 80,
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        registration_deadline: new Date('2024-04-13T00:00:00.000Z'), // Corrected date format
        organizer: '65fbccac769984fe46c830a1',
        category: 'social-gathering'
    },
];

const insertInitialData = async () => {
    try {
        await Event.insertMany(initialEvents);
        console.log('Initial data inserted successfully');
    } catch (error) {
        console.error('Error inserting initial data:', error);
    }
};
// insertInitialData()
module.exports = Event;
