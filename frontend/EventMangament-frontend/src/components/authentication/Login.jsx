import classes from './Login.module.css'
import { FaUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";
import axios from 'axios';
const LoginForm = () =>{
const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', error: '', isLoggedIn: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormData(formData)) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                email: formData.email,
                password: formData.password
            });
            const { token,user_id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', token);
            localStorage.setItem('isLoggedIn', 'true');
            setFormData(prevState => ({ email: '', password: '', error: '', isLoggedIn: false }));
            navigate('/events');

        } catch (error) {
            setFormData(prevState => ({ ...prevState, error: 'Invalid username or password' }));
        }
    };
    const validateFormData = (data) => {
        const { email, password } = data;
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
        <div className={classes["login-container"]}>
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className={classes["input-box"]}>
                    <input type="text" name="email" placeholder='email' value={formData.email} onChange={handleChange} required/>
                    <FaUser className= {classes.icon}/>
                </div>
                <div className={classes["input-box"]}>
                    <input type="password" placeholder='password' name="password" value={formData.password} onChange={handleChange} required/>
                    <CiLock className={classes.icon} />
                </div>
                <div className={classes.forgot}>
                    <a href="#">Forgot Password?</a>
                </div>
                {formData.error && <p className={classes.error}>{formData.error}</p>}
                <button type="submit">Login</button>
                <div className={classes["register-link"]}>
                    <p>Don't have an account? <Link to='/register'>Register</Link></p>
                </div>
            </form>
        </div>
        </div>
    );
}
export default LoginForm

        // <div className={classes["login-container"]}>
        // <div className={classes.wrapper}>
        //     <form>
        //         <h1>Login</h1>
        //         <div className={classes["input-box"]}>
        //             <input type="text" placeholder='username' required/>
        //             <FaUser className= {classes.icon}/>
        //         </div>
        //         <div className={classes["input-box"]}>
        //             <input type="password" placeholder='password' required/>
        //             <CiLock className={classes.icon} />
        //         </div>
        //
        //         <div className={classes.forgot}>
        //             <a href="#">Forgot Password?</a>
        //         </div>
        //         <button type="submit">Login</button>
        //         <div className={classes["register-link"]}>
        //             <p>Don't have an account? <Link to='/register'>Register</Link></p>
        //         </div>
        //     </form>
        // </div>
        // </div>
