import './EventCard.css'
import {Card, CardContent, CardMedia, Typography, Button, Snackbar} from '@mui/material';
import {useState} from "react";
import axios from 'axios';

const EventCard = ({ event }) => {
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);

    const date = new Date(event.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const readableDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} `

    const handleRegister = () => {
        const event_id = event.id;
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('token');

        axios.post('http://localhost:3000/event/eventRegistration', {event_id,user_id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
                console.log(response.data)
                setRegistrationSuccess(true);
                setRegistrationError(false);
            })
            .catch((error) => {
                console.log(error.data)
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
                    {readableDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {event.location}
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


