import EventCard from "./EventCard.jsx";
import dummyImage from './../assets/background.jpg'
import conference from './../assets/conference.jpg'
import workshops from './../assets/workshops.jpg'
import socialGathering from './../assets/social gathering.jpg'
import seminar from './../assets/seminar.jpg'


import './events.css'
import axios from 'axios';
import {useEffect, useState} from "react";
const Events = () =>{
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:3000/event/events',config);
                const eventData = response.data.data.events;
                console.log(eventData)
                setEvents(eventData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);
    const eventData = {
        id: 1,
        name: "Sample Event",
        date: "2024-04-15",
        description: "This is a sample event description.",
        type: "Conference",
        totalCapacity: 100,
        imageUrl:dummyImage
    };
    return (
        <div className={"eventContainer"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : events.length === 0 ? (
                <p>No events currently available.</p>
            ) : (
                events.map(event => (
                    <EventCard
                        key={event._id}
                        event={{
                            id: event._id,
                            name: event.title,
                            date: event.date,
                            description: event.description,
                            type: event.category,
                            totalCapacity: event.capacity,
                            imageUrl: event.image
                        }}
                    />
                ))
            )}
        </div>
        )
}
export default Events;