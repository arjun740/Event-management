import SearchBar from "./SearchBar.jsx";
import EventFilters from "./EventFilters.jsx";
import './header.css'
const Header = () =>{
    return(
        <div className="serach-header-container">
        <EventFilters />
            <div className="search-bar-wrapper">
                <SearchBar />
            </div>
        </div>
    )
}
export default Header;