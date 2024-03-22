import styles from './ContactCard.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const ContactCard = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactCard}>
                <h2>Contact Us</h2>
                <form>
                    <div className={styles.formGroup}>
                        <TextField id="outlined-basic" label="Name" variant="outlined" className={styles.inputFields} InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.54)' } }} />
                    </div>
                    <div className={styles.formGroup}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" className={styles.inputFields} InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.54)' } }} />
                    </div>
                    <div className={styles.formGroup}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Message"
                            multiline
                            rows={4}
                            className={styles.inputFields}
                            InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.54)' } }}
                        />
                    </div>
                    <Button variant="contained" style={{ fontWeight: 600  ,fontSize: '16px' }}>SUBMIT</Button>
                </form>
            </div>
        </div>
    );
};

export default ContactCard;