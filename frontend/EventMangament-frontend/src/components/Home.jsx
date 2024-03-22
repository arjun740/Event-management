import classes from "./Home.module.css";
import EventImag from "./assets/eventImgHomePage.jpg";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';


const Home = () =>{
    return <div className={classes.homeContainer}>
        <div className={classes.textAndButtonContainer}>
            <div className={classes.textWrapper}>
                <h1>Get Ready for Exciting Updates</h1>
                <p>Stay in the loop with our latest news and event announcements. Subscribe to our newsletter and be the first to know about upcoming events, exclusive offers, and more.</p>
            </div>
            <div>
                <TextField id="outlined-basic" label="Email" variant="outlined" className={classes.inputFields} InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.54)' } }} />
                <Button variant="contained" style={{ fontWeight: 600, fontSize: '16px' }} className={classes["MuiButton-root"]}>SUBSCRIBE FOR NEWSLETTER</Button>
            </div>
        </div>
        <div className={classes.imageContainer}>
            <img src={EventImag} alt="event Image" />
        </div>
    </div>

}
export default Home;