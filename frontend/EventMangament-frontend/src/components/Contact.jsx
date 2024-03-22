import React from "react";
import ContactCard from "./ContactCard.jsx";
import classes from './Contact.module.css'
const  ContactPage = () =>{
    return <div className={classes.contactWrapper} id={"contact"}>
        <div className={classes.contactTextContainer}>
            <div className={classes.textWrapper}>
                <h1>Need a Superpower? We Might Have It.</h1>
                <p>We believe in building genuine connections with our clients. Just like a sidekick empowers a superhero,
                    we want to be your partner in achieving your goals. Reach out today and let's see how we can team up to
                    make the impossible possible!</p>
            </div>
        </div>
        <ContactCard />
    </div>
}
export default ContactPage;