import React, {useEffect, useState} from "react";
import axios from 'axios'

const EventContext = React.createContext({
    Event:[],
    isLoading:true,
    customEventQuery: (categories,date,location) => {},
    getEventId: (id) => {}
})


export const EventContextProvider = (props) =>{
    const [events,setEvents]  = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [customQuery,setCustomQuery] = useState('')
    const [eventId, setEventId] = useState('');
    const EVENT_API =  'http://localhost:3000/event/events'
    useEffect(() => {
        const fetchEvent = async () =>{
            try{
                const token = localStorage.getItem('token');
                const isLoggedIn = localStorage.getItem('isLoggedIn')
                if(!token || !isLoggedIn) return;
                const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                };
                const URL =customQuery.length === 0 ? EVENT_API : customQuery
                const response = await axios.get(URL,config)
                const eventData = response.data.data.events;
                setEvents( eventData)
                setIsLoading(false)
            }catch (error){
                setIsLoading(false);
            }
        }
        fetchEvent()
    }, [customQuery]);
    useEffect(() => {
        const fetchEvent = async () =>{
            try{
                const token = localStorage.getItem('token');
                const isLoggedIn = localStorage.getItem('isLoggedIn')
                if(!token || !isLoggedIn) return;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get(`http://localhost:3000/event/${eventId}`,config)
                const eventData =  [response.data.event]
                setEvents( eventData)
                setIsLoading(false)
            }catch (error){
                setIsLoading(false);
            }
        }
        fetchEvent()
    }, [eventId]);


    const creatCustomQuery = (categories,date,location) => {
        const queryParams  = new URLSearchParams()
        if(categories && categories.length !== 0){
            categories.forEach(category => queryParams.append('category',category))
        }
        if(date){
            // const dateWithTime = `${date}T00:00:00.000Z`
            // queryParams.append('date',dateWithTime);
        }
        if(location){
            queryParams.append('location',location)
        }
        setCustomQuery(`${EVENT_API}?${queryParams.toString()}`)
    }
    const getEventId = (id) => {
        setEventId(id);
    }
    const eventCxt = {
        Event: events,
        isLoading: isLoading,
        customEventQuery: creatCustomQuery,
        getEventId: getEventId
    }
    return (
        <EventContext.Provider value={eventCxt} >
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
    </EventContext.Provider> )

}
export default EventContext;