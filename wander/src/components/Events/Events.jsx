import React, { useState, useEffect } from 'react'
// import data from '../../Utility/events.json'
import axios from 'axios';
import { Link } from 'react-router-dom'



const Events = () => {
const [events, setEvents] = useState()
// const url = '../../Utility/events.json';
const url = 'https://intense-island-04626.herokuapp.com/events/'

const getEvents = async () => {
    try {
        const data = await axios.get(url);
        setEvents(data.data);
        console.log(data.data);
    } catch(err) {
        console.log(err);
    }
}


useEffect(() => {
    getEvents();
    
}, [])

if (!events) {
    return <h1>Loading...</h1>
}

    return (
        <>
                {events.map((event) => (
                    <Link className='link' to={`/events/${event.id}`}>
                        <h2>{event.event_name}</h2>
                        <h4>{event.start}</h4>
                    </Link>
                    // <button onClick={addEvent}>Add Event</button>
                ))}

                {/* <Link to="/create">Create an Event</Link> */}
        </>
    )
}

export default Events
