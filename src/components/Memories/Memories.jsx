import { useState, useEffect, useContext } from 'react';
import { backendAPI} from '../../Utility/Config';
import {DataContext, DashContext} from '../../Utility/Context';
import axios from 'axios';
import { fireEvent } from '@testing-library/react';

const Memories = () => {
    const {minDate, maxDate, dateValue} = useContext(DashContext);
    const {currentUser} = useContext(DataContext);
    const [memories, setMemories] = useState([]);
    const [events, setEvents] = useState();
    const [addMem, setAddMem] = useState(false);
    const [userInput, setUserInput] = useState({});

    useEffect( () => {
        if(currentUser.memories.length) setMemories(currentUser.memories);
        if(currentUser.attending.length) setEvents(currentUser.attending);
        console.log('events: ',events);
    }, []);

    const handleChange = (e) => {
        if(e.target.name === 'photo') setUserInput({...userInput, [e.target.name]: e.target.files[0].name})
        else{
             setUserInput({...userInput, [e.target.name]: e.target.value});
            }
        console.log(userInput);
    }

      function fileChange(event) {
    console.log(`Selected file - ${event.target.files[0].name}`);
  }

  <input type="file" onChange={handleChange} />
    
    const toggleMem = () => {
        setAddMem(!addMem);
    }
    
    const handleSubmit = async(event) => {
        // console.log('userInput: ', {...userInput, photo: sp})
        event.preventDefault();
        try {
            console.log(`${backendAPI}/memories/`)
            console.log(userInput)
            const memory = await axios.post(`${backendAPI}/memories`, 
                userInput,
                { 
                headers: { 
                    Authorization: `Token ${localStorage.getItem('auth')}`
                    }
                })
                console.log(memory)
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
                <input type="text" name="title" onChange={handleChange}/>
                <textarea name="body" rows='10' onChange={handleChange}/>
                <select name="event" defaultValue={null} onChange={handleChange}>
                    return (
                        <>
                         <option name={null} selected value={null}>
                            Choose an event.</option>
                    {events.map(event => {
                        console.log('events', events);
                        return(
                            <option name='event' value={event.id}>
                                {event.name}
                            </option>
                        )
                    })}
                    </>
                    )
                </select>
                <input type="file" name="photo" accept='image/jpg, image/jpeg, image/png' placeholder="choose image" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        )}
        {memories && memories.map(event => {
            return(
                <>
                <h2>{event.title}</h2>
                <p>{event.body}</p>
                <image src={event.photo}/>
                </>
            )
        })}
            
        </div>
    );
}

export default Memories