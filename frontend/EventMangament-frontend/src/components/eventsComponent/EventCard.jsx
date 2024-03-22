import './EventCard.css'
import {Card, CardContent, CardMedia, Typography, Button, Snackbar} from '@mui/material';
import {useEffect, useState} from "react";
import axios from 'axios';
import conference from './../assets/conference.jpg'
import workshops from './../assets/workshops.jpg'
import socialGathering from './../assets/social gathering.jpg'
import seminar from './../assets/seminar.jpg'

const EventCard = ({ event }) => {
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);

    const handleRegister = () => {
        const user_id = localStorage.getItem('user_id');
        const event_id = event.id;
        const token = localStorage.getItem('token');

        axios.post('http://localhost:3000/event/eventRegistration', { user_id, event_id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setRegistrationSuccess(true);
                setRegistrationError(false);
            })
            .catch(error => {
                setRegistrationSuccess(false);
                setRegistrationError(true);
            });
    };

    const handleCloseSnackbar = () => {
        setRegistrationSuccess(false);
        setRegistrationError(false);
    };
    return (
        <>
            <Card className="event-card">
                <CardMedia
                    className="event-image"
                    component="img"
                    height="140"
                    image={event.imageUrl}
                    alt={event.name}
                />
                <CardContent className="events-detail">
                    <Typography gutterBottom variant="h5" component="div" className="event-card-text">
                        {event.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {event.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {event.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {event.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.totalCapacity} members
                    </Typography>
                    <Button onClick={handleRegister} variant="contained" className="register-button" style={{ fontWeight: 600  ,fontSize: '16px',marginTop:'50px', width: '200px' }}>Register</Button>
                </CardContent>
            </Card>
            <Snackbar
                key="success"
                open={registrationSuccess}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Successfully registered!"
                sx={{ backgroundColor: '#4caf50' }}
            />

            <Snackbar
                key="error"
                open={registrationError}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Already registered!"
                sx={{ backgroundColor: '#f44336' }}
            />
        </>
    );
};

export default EventCard;


