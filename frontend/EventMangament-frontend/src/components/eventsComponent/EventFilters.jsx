import React, { useState, useEffect } from 'react';
import './eventFilter.css'
function EventFilters() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);


    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('your-location-api-endpoint');
            const data = await response.json();
            setLocations(data.locations); // Replace with your API response structure
        };

        // fetchLocations();
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

        // Implement logic to send filter data (selectedCategories, selectedDate, selectedLocation)
        // to your backend for filtering events
        console.log('Filters:', selectedCategories, selectedDate, selectedLocation);

        // Reset filters (optional)
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
                            checked={selectedCategories.includes('conferences')}
                            onChange={() => handleCategoryClick('conferences')}
                        />
                        <label htmlFor="conferences">Conference</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="workshops"
                            name="category"
                            value="workshop"
                            checked={selectedCategories.includes('workshops')}
                            onChange={() => handleCategoryClick('workshops')}
                        />
                        <label htmlFor="workshops">Workshop</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="seminars"
                            name="category"
                            value="seminar"
                            checked={selectedCategories.includes('seminars')}
                            onChange={() => handleCategoryClick('seminars')}
                        />
                        <label htmlFor="seminars">Seminar</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="social-gatherings"
                            name="category"
                            value="social gathering"
                            checked={selectedCategories.includes('social gatherings')}
                            onChange={() => handleCategoryClick('social gatherings')}
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
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">Find Events</button>
        </form>)
}

export default EventFilters;
