import React, {useState} from 'react';
import axios from 'axios'

const Create = () => {
    const url = `https://intense-island-04626.herokuapp.com/events/`
    let initialState = {
            "event_name": '',
            "summary": '',
            "city": '',
            "address": '',
            "eventbrite_url": '',
            "img_url": '',
            "start": '',
            "end": '',
            "status": '',
            "currency": '',
            "seen": false,
    }
    const [formstate, setFormstate] = useState(initialState);

    function handleSubmit(event){
        event.preventDefault();
        

    }

    const addEvent = async (event) => {
        event.preventDefault();
        try {
            await axios.post(url,{
                event_name: formstate.event_name,
                summary: formstate.summary,
                city: formstate.city,
                address: formstate.address,
                eventbrite_url: formstate.eventbrite_url,
                img_url: formstate.img_url,
                start: formstate.start,
                end: formstate.end,
                status: formstate.status,
                currency: formstate.currency,
                seen: false,
            })
        } catch (error) {
            console.log(error)
        }
    }

   
    const handleChange = (event) => {
        setFormstate({...formstate, [event.target.id]: event.target.value});
    };

    return (
        <div>
            <h3>Add Event</h3>
            <form onSubmit={handleSubmit}>
                <label id="event_name" htmlFor="event-name">Event Name</label>
                <input placeholder='event name'/>
                <label id="summary" htmlFor="event-name">Summary</label>
                <textarea placeholder='summary'/> 
                <label id="city" htmlFor="start-timetart">City</label>
                <input placeholder='city'/>
                <label id="address" htmlFor="start-timetart">Address</label>
                <input placeholder='address'/>
                <label id="eventbrite_url" htmlFor="start-timetart">Event URL</label>
                <input placeholder='event url'/>
                <label id="img_url" htmlFor="start-timetart">Image URL</label>
                <input placeholder='image url'/>
                <label id="start" htmlFor="start-timetart">Start Time</label>
                <input placeholder='start time'/>
                <label id="end" htmlFor="end-time">End Time</label>
                <input placeholder='end time'/>
                <label id="status" htmlFor="start-timetart">Status</label>
                <input placeholder='status'/>
                <label id="currency" htmlFor="start-timetart">Currency</label>
                <input placeholder='currency'/>
                <button type="submit" onSubmit={addEvent}></button>                 

            </form>       
        </div>
    );
};

export default Create;