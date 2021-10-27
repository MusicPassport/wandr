
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {backendAPI} from '../../../Utility/Config';
import axios from 'axios';

const ResetPassword = () => {

    const [userInput, setUserInput] = useState({});

    const handleChange = (e) => {
    setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
          let config= {  
            headers: {
                Authorization: `Token ${localStorage.getItem('auth')}`
                },
            data: userInput,
        }
        try {
            const update = await axios.put(`${backendAPI}/users/me/`, config);
            console.log(update);
        } catch(err) {
            console.log(err);
        }
    }
    return (
         <form className="personal-settings" onSubmit={handleSubmit}>
            <>
                <label htmlFor="pw">New Password: </label>
                <input id='pw' name='pw' type="text" placeholder="new password"onChange={handleChange}/>
                
                <label htmlFor="pw-confirm">Confirm Password: </label>
                <input id='pw-confirm' name='pw-confirm' type="text" placeholder="confirm new password" onChange={handleChange}/>

                <div className="dashboard-buttons">
                        <button type="submit">Submit</button>
                        <Link to='/dashboard/'>Cancel</Link>
                </div>
            </>
        </form>
    );
};

export default ResetPassword;