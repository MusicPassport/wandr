import React, { useState } from 'react'
import axios from 'axios'
import { backendAPI } from '../../../Utility/Config'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const SignUp = () => {

const [username, setUsername] = useState()
const [password, setPassword] = useState()
const [validatePassword, setValidatePassword] = useState()
const history = useHistory();

const createUser = async (e) => {
    e.preventDefault();
    // checkPasswords()
    try {
        if (password === validatePassword) {            

            const res = await axios.post(`${backendAPI}/users/`, {

                email: username,
                username: username,
                password: password,
                re_password: password
            })
            console.log(res);
            history.push('/login')
        }
    } catch (error) {
        console.log(error);
    }
}

const capturePassword = (e) => {
    setPassword(e.target.value)
}

const confirmPassword = (e) => {
    setValidatePassword(e.target.value)
}

const captureUsername = (e) => {
    setUsername(e.target.value)
}

// const checkPasswords = async (e) => {
//     await setPassword(e.target.value)
//     await setValidatePassword(e.target.value)
//     if (password !== validatePassword) {
//         alert('Passwords do not match!')
//     }
// }
    return (
			<div>
				<form onSubmit={createUser}>
					<h2>Sign Up</h2>
					<div className='username'>
						<label htmlFor=''>Username:</label>
						<input
							type='text'
							placeholder=' e.g. myaddress@email.com'
							onChange={captureUsername}
						/>
					</div>
					<div className='password'>
						<label htmlFor=''>Password:</label>
						<input
							type='password'
							className='new-password'
							placeholder=' enter password'
							onChange={capturePassword}
						/>
					</div>
					<div className='password '>
						<label htmlFor=''>Confirm Password:</label>
						<input
							type='password'
							className='confirm-password'
							placeholder=' enter password'
							onChange={confirmPassword}
						/>
					</div>
					<button type='submit' className='signup-login'>
						Sign Up
					</button>
				</form>
                <div className='redirect-user'>
				<p>Already have an account? Login!</p>
				<Link to='/login'>
					<button>Login</button>
				</Link>
			    </div>
			</div>
		);
}

export default SignUp
