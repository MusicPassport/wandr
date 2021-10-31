import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {backendAPI} from '../../../Utility/Config';
import axios from 'axios';
import '../../../css/Auth.css';

const ResetPassword = () => {
    const history = useHistory();

    const [userInput, setUserInput] = useState({});

    const handleChange = (e) => {
    setUserInput({...userInput, [e.target.name]: e.target.value});
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        //This is NOT for users who have forgotten their info. THAT should be handled on LOGIN/SIGNUP
        //When that is created, it should be done with reset endpoints
        try {
            console.log(userInput);
            if(userInput['new_password'].length < 8) {
                //for dev only. Replace with toast/message later.
                console.log('pw is too short');
                return;
            }
            if(userInput['password'] === userInput['pw-confirm']){ 
            const update = await axios.post(`${backendAPI}/users/set_password/`,  
                {
                    new_password: userInput['new_password'],
                    re_new_password: userInput['re_new_password'],
                    current_password: userInput['current_password']
                },
                { 
                    headers: { 
                        Authorization: `Token ${localStorage.getItem('auth')}`
                    }
                });
                console.log(update);
                //add logout option here.
                
                
                await axios.post(`${backendAPI}/token/logout/`, localStorage.getItem('auth'),
                 {
                     headers: {
                         Authorization: `Token ${localStorage.getItem('auth')}`
                     }
                }
                );
                history.push('/dashboard');
            } else {console.log('pws don\'t match')}

        } catch(err) {
            console.log(err);
        }
    }
    return (
			<>
				<h2 className='auth-title'>Update Your Password</h2>
				<div className='form-container reset-container'>
					<form className='auth-form' onSubmit={handleSubmit}>
						<>
							<label htmlFor='new_password' className='auth-label'>
								New Password:{' '}
							</label>
							<input
								name='new_password'
								className='auth-input signUp reset'
								type='text'
								placeholder='new password'
								onChange={handleChange}
							/>

							<label htmlFor='re_new-password' className='auth-label'>
								Confirm Password:{' '}
							</label>
							<input
								name='re_new_password'
								className='auth-input signUp reset'
								type='text'
								placeholder='confirm new password'
								onChange={handleChange}
							/>

							<label htmlFor='current_password' className='auth-label'>
								Current Password:{' '}
							</label>
							<input
								name='current_password'
								className='auth-input signUp reset'
								type='text'
								placeholder='current password'
								onChange={handleChange}
							/>

							<div className='reset-btns'>
								<button type='submit' className='btn signup-login'>
									Submit
								</button>
								<Link to='/dashboard/'>
									{' '}
									<button type='submit' className='btn signup-login'>
										Cancel
									</button>
								</Link>
							</div>
						</>
					</form>
				</div>
			</>
		);
};

export default ResetPassword;