import  {useState, useEffect, useContext} from 'react';
import './eventFilter.css'
import axios from 'axios';
import EventContext from "../../EventContext.jsx";
function EventFilters() {
    const {customEventQuery} = useContext(EventContext);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:3000/event/eventLocations',config);
                const data = response.data.location
                setLocations(data);
            }catch (error) {
                console.log(error)
            }
        };
        fetchLocations();
    }, []);

    const handleCategoryClick = (category) => {
        const isSelected = selectedCategories.includes(category);
        if (isSelected) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        customEventQuery(selectedCategories,selectedDate,selectedLocation)
        setSelectedCategories([]);
        setSelectedDate('');
        setSelectedLocation('');
    };

    return (
        <form onSubmit={handleSubmit} className="event-filters">
            <h2>Event Filters</h2>

            <div className="category-filters">
                <h3>Categories</h3>
                <ul>
                    <li>
                        <input
                            type="checkbox"
                            id="conferences"
                            name="category"
                            value="conference"
                            checked={selectedCategories.includes('conference')}
                            onChange={() => handleCategoryClick('conference')}
                        />
                        <label htmlFor="conferences">Conference</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="workshops"
                            name="category"
                            value="workshop"
                            checked={selectedCategories.includes('workshop')}
                            onChange={() => handleCategoryClick('workshop')}
                        />
                        <label htmlFor="workshops">Workshop</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="seminars"
                            name="category"
                            value="seminar"
                            checked={selectedCategories.includes('seminar')}
                            onChange={() => handleCategoryClick('seminar')}
                        />
                        <label htmlFor="seminars">Seminar</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="social-gatherings"
                            name="category"
                            value="social gathering"
                            checked={selectedCategories.includes('social-gathering')}
                            onChange={() => handleCategoryClick('social-gathering')}
                        />
                        <label htmlFor="social-gatherings">Social Gathering</label>
                    </li>
                </ul>
            </div>

            <div className="date-filter">
                <h3>Date</h3>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            <div className="location-filter">
                <h3>Location</h3>
                <select value={selectedLocation} onChange={handleLocationChange}>
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">Find Events</button>
        </form>)
}

export default EventFilters;
