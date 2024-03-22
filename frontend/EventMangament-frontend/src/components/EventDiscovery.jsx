import classes from './EventDiscovery.module.css'
import Button from '@mui/material/Button';
import EventImag from './assets/eventImage.jpg'
import { Link } from 'react-router-dom';
const EventDiscovery = () => {
    return <div className={classes.eventDiscoveryContainer}>
        <div className={classes.imageContainer}>
            <img src={EventImag} alt={"event Image"}/>
        </div>
        <div className={classes.textAndButtonContainer}>
            <div className={classes.textWrapper}>
                <h1>Discover Your Next Adventure</h1>
                <p>Find exciting events near you and embark on unforgettable experiences. Whether you're looking for
                    live music, food festivals, art exhibitions, or outdoor adventures, our app connects you with the
                    best events happening in your area. Discover new passions, make lasting memories, and create stories
                    to cherish for a lifetime.</p>

            </div>
            <Link to="/events">
                <Button variant="contained" style={{ fontWeight: 600, fontSize: '16px' }} className={classes["MuiButton-root"]}>
                    DISCOVER
                </Button>
            </Link>
        </div>
    </div>
}
export default EventDiscovery;