import React from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios'

const Update = () => {
        let id; 
        const [event, setEvent] = useState()
        const url = `https://intense-island-04626.herokuapp.com/events/${id}`
        let initialState = {
            
        }
        
        const UpdateEvent = async () => {
            try {
                await axios.put(url)
            } catch (error) {
                console.log(error)
            }
        }
    
        function handleSubmit(event){

    
        }
    
        return (
            <div>
                <h3>Add Event</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="event-name">Event Name</label>
                    <input placeholder='event name'/>
                    <label htmlFor="start-timetart">Start Time</label>
                    <input placeholder='start time'/>
                    <label htmlFor="end-time">End Time</label>
                    <input placeholder='end time'/>
                    <label htmlFor="event-name">Summary</label>
                    <textarea placeholder='summary'/> 
                    <button type="submit" onSubmit={addEvent}></button>                 
    
                </form>       
            </div>
        );
};

export defualt Update;