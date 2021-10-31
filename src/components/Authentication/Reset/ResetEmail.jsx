import { useState } from 'react';
import { Link } from 'react-router-dom';
import { backendAPI } from '../../../Utility/Config';
import axios from 'axios';

const ResetEmail = () => {
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
            data: { 
                username: userInput['email'],
                email: userInput['email']
            },
        }
        try {
            const update = await axios.put(`${backendAPI}/users/me/`, {
                    username: userInput['email'],
                    email: userInput['email']
                }, { 
                    headers: {  Authorization: `Token ${localStorage.getItem('auth')}` } 
                });

        } catch(err) {
            console.log(err);
        }
    }
    return (
        <form className="personal-settings" onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address: </label>
            <input id = 'email' name='email' type="text" placeholder="email address" onChange={handleChange}/>
             <div className="dashboard-buttons">
                        <button type="submit">Submit</button>
                        <Link to='/dashboard/'>Cancel</Link>
            </div>
        </form>
    );
};

export default ResetEmail;