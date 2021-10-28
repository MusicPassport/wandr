import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { backendAPI } from '../../../Utility/Config';
import { DataContext } from '../../../Utility/Context.jsx';
import { Link } from 'react-router-dom';

const Login = () => {
    const { currentUser, setCurrentUser } = useContext(DataContext)
	const history = useHistory();

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${backendAPI}/token/login`, {
				password: password,
				email: email,
			});
			console.log(res);
			const auth = res.data.auth_token;
			localStorage.setItem('auth', auth);
			await getUser(auth);
			history.push('/dashboard');
			// console.log(res.data.auth_token);
		} catch (error) {
			console.log(error);
		}
	};

	const getUser = async (auth) => {
		console.log(localStorage.getItem('auth'));
        // console.log(auth);

		const login = await axios.get(`${backendAPI}/users/me/`, {
			headers: {
				Authorization: `Token  ${auth}`,
			},
		});
		console.log(login.data.id);
        const getUserInfo = await axios.get(`${backendAPI}/users/${login.data.id}/`, {
			headers: {
				Authorization: `Token  ${auth}`,
			},
		})
        console.log(getUserInfo);
		localStorage.setItem('currentUser', JSON.stringify(getUserInfo.data));
        setCurrentUser({...getUserInfo.data})
        console.log(currentUser)
	};

	const captureEmail = (e) => {
		setEmail(e.target.value);
	};

	const capturePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Login</h2>
				<div className='username'>
					<label htmlFor=''>Username:</label>
					<input
						type='text'
						placeholder=' e.g. myaddress@email.com'
						onChange={captureEmail}
					/>
				</div>
				<div className='password'>
					<label htmlFor=''>Password:</label>
					<input
						type='password'
						placeholder=' enter password'
						onChange={capturePassword}
					/>
				</div>
				<button type='submit' className='signup-login'>
					Login
				</button>
			</form>
			<div className='redirect-user'>
				<p>New? Sign Up!</p>
				<Link to='/signup'>
					<button>SignUp</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;
