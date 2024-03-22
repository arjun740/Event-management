import classes from './Registration.module.css'
import { FcGoogle } from "react-icons/fc";
import {FaGoogle, FaUser} from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from 'axios';
const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', error: '', isLoggedIn: false });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormData(formData)) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/user/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('isLoggedIn', 'true');
            setFormData(prevState => ({ username: '', email: '', password: '', error: '', isLoggedIn: false }));
            navigate('/events');
        } catch (error) {
            setFormData(prevState => ({ ...prevState,error: 'Invalid email or password' }));
        }
    };

    const validateFormData = (data) => {
        const { username, email, password } = data;
        if (username.trim() === '') {
            setFormData(prevState => ({ ...prevState, error: 'Username is required' }));
            return false;
        }
        if (password.length < 8) {
            setFormData(prevState => ({ ...prevState, error: 'Password must be at least 8 characters' }));
            return false;
        }
        if (!email.includes('@')) {
            setFormData(prevState => ({ ...prevState, error: 'Invalid email address' }));
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    return (
        <div className={classes["container-registration"]}>
            <div className={classes["wrapper-registration"]}>
                <form onSubmit={handleSubmit}>
                    <h1>Join Evently</h1>
                    <div className={classes["have-account"]}>
                        <Link to={'/login'}>Already have an account?</Link>
                    </div>
                    <div className={classes["socialmedia-container"]}>
                        <div className={classes.socialmedia}>
                            <h1>Continue with Google</h1>
<FcGoogle className={classes.icon} />
                            {/*<FaGoogle className={classes.icon}/>*/}
                        </div>
                    </div>
                    <div className={classes["use-email"]}>
                        <a>or use your email</a>

                    </div>
                    <div className={classes["input-box"]}>
                        <input placeholder="username" name="username" type="text" onChange={handleChange} required/>
                        <FaUser className= {classes.icon}/>
                    </div>
                    <div className={classes["input-box"]}>
                        <input placeholder="Email" type="email" name={"email"} onChange={handleChange} required/>
                        <FaUser className= {classes.icon}/>
                    </div>
                    <div className={classes["input-box"]}>
                        <input placeholder="Password" type="password" name={"password"} onChange={handleChange} required/>
                        <CiLock className={classes.icon} />
                    </div>
                    <div className={classes["terms-conditions"]}>
                        <label>
                        <input type="checkbox" required/>
                            I agree to the Terms of Service and Privacy Policy
                        </label>
                    </div>
                    {formData.error && <p className={classes.error}>{formData.error}</p>}
                    <button>Sign up</button>
                    <p>By continuing, you're agreeing to our</p>
                    <p className={classes.policy}>Privacy Policy and Terms of Service</p>
                </form>
            </div>
        </div>
    );
}


export default Registration;