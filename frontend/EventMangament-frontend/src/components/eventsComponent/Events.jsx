import EventCard from "./EventCard.jsx";
import './events.css'
import {useContext} from "react";
import EventContext from "../../EventContext.jsx";
const Events = () =>{
    const {Event,isLoading} = useContext(EventContext)
    console.log(Event)
    return (
        <div className={"eventContainer"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : Event.length === 0 ? (
                <p>No events currently available.</p>
            ) : (
                Event.map(Event => (
                    <EventCard
                        key={Event['_id']}
                        event={{
                            id: Event['_id'],
                            name: Event.title,
                            date: Event.date,
                            description: Event.description,
                            type: Event.category,
                            totalCapacity: Event.capacity,
                            imageUrl: Event.image,
                            location:Event.location
                        }}
                    />
                ))
            )}
        </div>
        )
}
export default Events;
// const [events, setEvents] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
// useEffect(() => {
//     const fetchEvents = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             };
//             const response = await axios.get('http://localhost:3000/event/events',config);
//             const eventData = response.data.data.events;
//             setEvents(eventData);
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching events:', error);
//             setIsLoading(false);
//         }
//     };
//
//     fetchEvents();
// }, []);