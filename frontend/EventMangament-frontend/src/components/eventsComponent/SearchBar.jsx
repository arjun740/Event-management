import  {useState, useEffect, useContext} from 'react';
import './SearchBar.css';
import EventContext from "../../EventContext.jsx"; // Import CSS file
import axios from 'axios'

function SearchBar() {
    const {getEventId} = useContext(EventContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);



    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {

        const timeOut = setTimeout(async () => {
            try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            if(!searchTerm){
                setSearchResults([]);
                return;
            }
            const response = await axios.get(`http://localhost:3000/event/eventsList?searchString=${searchTerm}`, config)
            const data = response.data.suggestions;
            setSearchResults(data)
            }
            catch (error) {
                console.log(error)
            }
        },500);


        return  () => {
            clearTimeout(timeOut)
        }
    }, [searchTerm]);

    const handleSelect = (suggestion) => {
        getEventId(suggestion)
        setSearchResults([]);
        setSearchTerm("")
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
                    {searchResults.map((event) => (
                        <li key={event["_id"]} onClick={() => handleSelect(event["_id"])}>
                            {event.title}
                     </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;