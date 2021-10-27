import axios from 'axios';
import React, { useState } from 'react'
import { backendAPI } from '../../../Utility/Config';

const Login = () => {

const [email, setEmail] = useState()
const [password, setPassword] = useState()
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${backendAPI}/token/login`, {
            password: password,
            email: email,
        })
        console.log(res);
        // console.log(res.data.auth_token);
    } catch (error) {
        console.log(error);
    }

}

const captureEmail = (e) => {
    setEmail(e.target.value)
}

const capturePassword = (e) => {
    setPassword(e.target.value)
}

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className='username'>
            <label htmlFor="">Username:</label>
            <input type="text" placeholder=' e.g. myaddress@email.com' onChange={captureEmail} />
            </div>
            <div className='password'>
            <label htmlFor="">Password:</label>
            <input type="password" placeholder=' enter password' onChange={capturePassword} />
            </div>
            <button type="submit" className='signup-login'>Login</button>
        </form>
    )
}

export default Login
