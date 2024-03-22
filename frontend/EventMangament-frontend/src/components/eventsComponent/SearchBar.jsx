import React, { useState, useEffect } from 'react';
import './SearchBar.css'; // Import CSS file

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.length > 2) {
                const response = await fetch(`your-api-endpoint?q=${searchTerm}`);
                const data = await response.json();
                setSearchResults(data.suggestions); // Replace with your API response structure
            } else {
                setSearchResults([]);
            }
        };

        // fetchData();
    }, [searchTerm]); // Run effect only when searchTerm changes

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSelect = (suggestion) => {
        // Handle selection of a search suggestion (e.g., redirect to search page)
        setSearchTerm(suggestion);
        setSearchResults([]); // Clear suggestions on selection
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search Events"
                value={searchTerm}
                onChange={handleChange}
            />
            {searchResults.length > 0 && (
                <ul className="search-results">
                    {searchResults.map((suggestion) => (
                        <li key={suggestion} onClick={() => handleSelect(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;