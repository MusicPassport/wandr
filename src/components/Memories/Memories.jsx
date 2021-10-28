import { useState, useEffect, useContext } from 'react';
import { backendAPI} from '../../Utility/Config';
import {DataContext, DashContext} from '../../Utility/Context';
import axios from 'axios';
import { fireEvent } from '@testing-library/react';
import './Memories.css';

const Memories = () => {
    const {minDate, maxDate, dateValue} = useContext(DashContext);
    const {currentUser} = useContext(DataContext);
    const [memories, setMemories] = useState([]);
    const [events, setEvents] = useState();
    const [addMem, setAddMem] = useState(false);
    const [userInput, setUserInput] = useState({
        title: "",
        body: "",
        photo: "",
        event: ""
    });
    //need to figure out how to sort memories by their related Event's start.

    useEffect( () => {
        if(currentUser.memories.length) setMemories(currentUser.memories);
        if(currentUser.attending.length) setEvents(currentUser.attending);
    }, []);

    const sortMemories = () => {
        // I want to get  each event that has memories.
        let memEvents = events.filter(event => memories.some(memory => memory.event === event.id));
        // Then, I want to sort those events, newest to oldest. 
        memEvents = memEvents.sort((a,b) => b.start - a.start);
        // Then, I want to sort my memories to match that order.
        //Need a good sorting algo here.
    }

    const handleChange = (e) => {
             setUserInput((previousState) => {
                 return {...previousState, [e.target.id]: e.target.value};
    })}

      const fileChange = (e) => {
           setUserInput((previousState) => {
               return {...previousState, photo: e.target.files[0]};
    })}

    const toggleMem = () => {
        setAddMem(!addMem);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const data = new FormData();

           data.append('title', userInput.title);
           data.append('body', userInput.body);
           data.append('photo', userInput.photo);
           data.append('event', userInput.event);
               await axios.post(`${backendAPI}/memories/`, 
                data ,
                { 
                    'Content-Type': 'multipart/form-data',
                headers: { 
                    Authorization: `Token ${localStorage.getItem('auth')}`
                    }
                })
                setAddMem(!addMem);
        } catch(err) {
            console.log(err);
        }
    }

return (
    <div>
        <h1>{memories.length ? 'Hello from memories' : 'No memories yet'}</h1>
       <button onClick={toggleMem}>Add a memory</button>
        {addMem && (
            <form onSubmit={handleSubmit}>
                <input id="title" type="text" name="title" value={userInput.title} onChange={handleChange}/>
                <textarea id="body" name="body" rows='10' value={userInput.body} onChange={handleChange}/>
                <select id="event" name="event" defaultValue={null} value={userInput.event} onChange={handleChange}>
                    return (
                        <>
                         <option name={null} selected value={null}>
                            Choose an event.</option>
                    {events.map(event => {
                        if(!dateValue && !minDate){
                             return(
                            <option name='event' value={event.id}>
                                {event.name}
                            </option>
                                )}
                        else if(!dateValue &&
                            event.start > minDate && 
                            event.start < maxDate){
                            return(
                                <option name='event' value={event.id}>
                                    {event.name}
                                </option>
                            )}
                        else {
                            if(event.start === dateValue ){
                            return(
                            <option name='event' value={event.id}>
                                {event.name}
                            </option>
                            )}}
                    })}
                    </>
                    )
                </select>
                <input type="file" id="photo"name="photo" placeholder="choose image" onChange={fileChange} />
                <button type="submit">Submit</button>
                <button onClick={toggleMem}>Cancel</button>

            </form>
        )}
        {memories && memories.map(event => {
            return(
                <div className="memory">
                <h2>{event.title}</h2>
                <img src={event.photo} alt="alt"/>
                <p>{event.body}</p>
                </div>
            )
        })}
        </div>
    );
}

export default Memories
