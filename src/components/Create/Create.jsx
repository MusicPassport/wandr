import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { DataContext } from '../../Utility/Context.jsx';
import './Create.css'

const Create = () => {

const { currentUser } = useContext(DataContext)
const [eventID, setEventID] = useState()

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

// console.log(makeid(5));

    const url = `https://intense-island-04626.herokuapp.com/events/`
    let initialState = {
                "id": "",
                "name": "",
                "owner": "",
                "genre": "",
                "city": "",
                "address": "",
                "tm_url": "",
                "venue": "",
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
    console.log(currentUser);

    const addEvent = async (e) => {
        // e.preventDefault();
        try {
           const res = await axios.post(url,{
                id: eventID,
                name: formState.name,
                owner: currentUser.username,
                genre: formState.genre,
                city: formState.city,
                address: formState.address,
                // tm_url: formState.url,
                venue: formState.venue,
                img_url: formState.img_url,
                start: formState.start,
                seen: false,
            })
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

   
    const handleChange = (event) => {
        setFormState({...formState, [event.target.id]: event.target.value});
    };

    return (
        <div>
            <h3>Add Event</h3>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label htmlFor="event-name">Event Name</label>
                <input id="name" placeholder='event name'/>
                <label htmlFor="genre">Genre</label>
                <input id="genre" placeholder='genre'/> 
                <label htmlFor="city">City</label>
                <input id="city" placeholder='city'/>
                <label htmlFor="address">Address</label>
                <input id="address" placeholder='address'/>
                {/* <label id="url" htmlFor="event-url">Event URL</label>
                <input placeholder='event url'/> */}
                <label htmlFor="venue">Venue</label>
                <input id="venue" placeholder='venue'/>
                <label htmlFor="image url">Image URL</label>
                <input id="img_url" placeholder='image url'/>
                <label htmlFor="start-time">Start Time</label>
                <input id="start" placeholder='start time'/>
                <button type="submit" >Submit</button>                 
            </form>       
        </div>
    );
};

export default Create;