import {useState, useEffect, useParams} from 'react';
import axios from 'axios';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import './Dashboard.css';


const Dashboard = () => {
    const [displaySettings, setDisplaySettings] = useState(false);
    const [memories,setMemories] = useState([]);
    const url = `https://intense-island-04626.herokuapp.com/users/me`;
    const token = localStorage.getItem('auth');

//     need to specify a request so that only this user's memories are gotten.
// get all memories that have this user's id in their owner property.

    const getContent = async() => {
        console.log(token);
        let config = {
            headers: {Bearer: token}
        }
        try {
            const content = await axios.get(url, config);
            setMemories(content.data.memories);
        } catch(err){
            //for dev only
            console.log(err);
        }
    }

    useEffect( () => {
       getContent();
    }, []);
/*
Okay, I need the user's personal calendar.
I need a form that appears when the user wants to update their profile.
I need a way to view memories.
*/
    const dateValue = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                10
            );
            const minDate = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                6
            );
            const maxDate = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                25
            );

    const openSettings = () => {
        setDisplaySettings(true);
    }

    const closeSettings = () => {
        setDisplaySettings(false);
    }

    return ( !displaySettings ? (
        <>
            <button className="settings" onClick={openSettings}>
                Profile Settings
            </button>

            <CalendarComponent
            className='personal-calendar'
            value={dateValue}
            min={minDate}
            max={maxDate}
            isMultiSelection={true}
            />

        <div className='personal-memories'>
            <h3>Memories</h3>
            <p>Content will go here.</p>
            {memories.map(memory => {
            return (
                    <>
                    <h6>{memory.title}</h6>
                    {/* need to update alts for memories */}
                    <img src={memory.image} alt="one of your memories!" />
                    <p>{memory.body}</p>
                </>
            );
            })}
        </div>
            
        </>
    ) : (
        <form className="personal-settings">

            <label htmlFor="email">Email Address: </label>
            <input id = 'email' name='email' type="text" placeholder="email address" />

            <label htmlFor="pw">New Password: </label>
            <input id='pw' name='pw' type="text" placeholder="new password"/>
            
            <label htmlFor="pw-confirm">Confirm Password: </label>
            <input id='pw-confirm' name='pw-confirm' type="text" placeholder="confirm new password" />
            <button type="submit">Submit</button>
            <button onClick={closeSettings}>Cancel</button>
        </form>
    )
    );
};

export default Dashboard;