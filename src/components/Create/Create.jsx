import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { DataContext } from '../../Utility/Context.jsx';
import '../../css/Create.css';
import { useHistory } from 'react-router-dom';

const Create = () => {
const history = useHistory()
const { currentUser } = useContext(DataContext)
const [eventID, setEventID] = useState("")
const auth = localStorage.getItem('auth')

const  createID = (length=8) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   setEventID(result);
}

    const url = `https://intense-island-04626.herokuapp.com/events/`
    let initialState = {
                "id": "",
                "name": "",
                "owner": "",
                "genre": "",
                "city": "",
                "address": "",
                "tm_url": "",
                "venue": null,
                "img_url": "",
                "start": "",
                "seen": false,
    }
    const [formState, setFormState] = useState(initialState);

    useEffect(() => {
        createID()
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        addEvent()
        
    }
    console.log(formState);
    console.log(eventID);

    const addEvent = async (e) => {
        // e.preventDefault();
        try {
            await axios.get(url, {
                  headers: {
				Authorization: `Token  ${auth}`,
			}
            })
           const res = await axios.post(url,{ 
               id: eventID,
               name: formState.name,
               owner: formState.owner,
               genre: formState.genre,
               city: formState.city,
               state: formState.state,
               address: formState.address,
               tm_url: "string",
               venue: null,
               img_url: formState.img_url,
               start: formState.start,
               attendees: [],
               viewers: [],
               // seen: false,
           },{
               headers: {
                Authorization: `Token  ${auth}`,
           },
            
         }) 
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

   
    const handleChange = (event) => {
        setFormState({...formState, [event.target.id]: event.target.value, "id": eventID, "owner": currentUser.username});


        
    };

    return (
			<div className='create-page'>
				<button className='backButton' onClick={() => history.goBack()}>
					←
				</button>
				<h2 className='auth-title'>Create A New Event</h2>

				{/* <h3>Add Event</h3> */}
				<div className='form-container signup-form create-container'>
					<form
						className='auth-form create-container'
						onSubmit={handleSubmit}
						onChange={handleChange}>
						<div className='right'>
							<div className='input-group'>
								<label className='auth-label' htmlFor='event-name'>
									Event Name:
								</label>
								<input
									id='name'
									className='auth-input signUp'
									placeholder='event name'
								/>
							</div>
							<div className='input-group'>
								<label className='auth-label' htmlFor='genre'>
									Genre:
								</label>
								<input
									id='genre'
									className='auth-input signUp '
									placeholder='genre'
								/>
							</div>
							<div className='input-group'>
								<label className='auth-label' htmlFor='address'>
									Address:
								</label>
								<input
									id='address'
									className='auth-input signUp reset'
									placeholder='address'
								/>
							</div>
							<div className='input-group'>
								<label className='auth-label' htmlFor='city'>
									City:
								</label>
								<input
									id='city'
									className='auth-input signUp reset'
									placeholder='city'
								/>
							</div>
						</div>
						<div className='left'>
							<div className='input-group'>
								<label className='auth-label' htmlFor='state'>
									State:
								</label>
								<input
									id='state'
									className='auth-input signUp reset'
									placeholder='state'
								/>
							</div>
							<div className='input-group'>
								<label className='auth-label' htmlFor='image url'>
									Image URL:
								</label>
								<input
									id='img_url'
									className='auth-input signUp reset'
									placeholder='image url'
								/>
							</div>
							<div className='input-group'>
								<label className='auth-label' htmlFor='start-time'>
									Start Time:
								</label>
								<input
									id='start'
									className='auth-input signUp'
									placeholder='start time reset'
								/>
							</div>
							<div className='create-btn'>
								<button
									type='submit'
									className='btn signup-login create-button'>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
};

export default Create;