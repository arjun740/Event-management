import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom';
import './NavBar.css'

function NavBar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token')
        navigate('/login');
    };
    const handleEventsClick = () => {
        if (!isLoggedIn || !localStorage.getItem('token')) {
            navigate('/login');
        } else {
            navigate('/events');
        }
    };
    return (
        <nav className="navbar">
            <div className="logo">
                <li><Link to="/">Evently</Link></li>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li>
                    <button className={"btn-event"} onClick={handleEventsClick}>Events</button>
                </li>
                <li><Link to="/">Contact</Link></li>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className=" sign-out-btn logout-btn">Logout</button>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="sign-in-btn btn-sign-in">Sign In</button>
                        </Link>
                        <Link to="/register">
                            <button className="sign-up-btn btn-sign-up">Sign Up</button>
                        </Link>
                    </>
                )}
            </ul>
        </nav>


    )
}

export default NavBar;
/*
* <Link to="/login">
                    <button className="sign-in-btn btn-sign-in">Sign In</button>
                </Link>
                <Link to="/register">
                    <button className="sign-up-btn btn-sign-up">Sign Up</button>
                </Link>
                * */
// <button onClick={handleEventsClick}>Events</button>
// <Link to="/events">Events</Link>