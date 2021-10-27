import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {DataContext} from '../../Utility/Context';
import { backendAPI } from '../../Utility/Config';

import { CalendarComponent, DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import './Dashboard.css';
import { findAllByDisplayValue } from '@testing-library/react';

const Dashboard = () => {

    const { currentUser } = useContext(DataContext);
    const [displaySettings, setDisplaySettings] = useState({
        calendar: false,
        timeline: false,
        settings: false,
        bucketlist: false,
        memories: false
    });
    const [dateValue, setDateValue] = useState(null);
    const [minDate, setminDate] = useState(null);
    const [maxDate, setmaxDate] = useState(null);
    const [memories,setMemories] = useState();

    const [userInput, setUserInput] = useState({});

    useEffect(() => {
        console.log('current user: ',currentUser);
        setMemories(currentUser.memories);
    })
   
/*
Okay, I need the user's personal calendar.
I need a form that appears when the user wants to update their profile.
I need a way to view memories.
*/

    const handleChange = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    const openAndClose = (e) => {
        let value = displaySettings[e.target.name];
        setDisplaySettings({...displaySettings, [e.target.name]: !value});
    }

    const handleSubmit = () => {

        let config = {
            headers: {
                Authorization: localStorage.getItem('auth')
            }
        }
        axios.put(`${backendAPI}/users/me`, config);

    }

    return ( !displaySettings.settings ? (
        <>
            <section className="dashboard-buttons">
                <button className="dashboard-btn" name='settings' onClick={openAndClose}>
                Profile Settings
            </button>
            <button className="dashboard-btn" name='calendar' onClick={openAndClose}>
                Calendar
            </button>
            <button className="dashboard-btn" name='timeline' onClick={openAndClose}>
                Time Line
            </button>
            <button className="dashboard-btn" name='memories' onClick={openAndClose}>
                Memories
            </button>
            <button className="dashboard-btn" name='bucketlist' onClick={openAndClose}>
                Bucket List
            </button>
            </section>

            <DateRangePickerComponent placeholder="pick a date range"></DateRangePickerComponent>
            {displaySettings.calendar && 
                <CalendarComponent
            className='personal-calendar'
            value={dateValue}
            min={minDate}
            max={maxDate}
            isMultiSelection={true}
            />
            }

            <div className='personal-memories'>
                <h3>Memories</h3>
                { displaySettings.memories && ( memories &&
                    memories.map(memory => {
                        return (
                                <>
                                <h6>{memory.title}</h6>
                                {/* need to update alts for memories */}
                                <img src={memory.image} alt="one of your memories!" />
                                <p>{memory.body}</p>
                            </>
                        );
                    })
                    ) 
                }
            </div>
            
        </>
    ) : (
        <form className="personal-settings" onSubmit={handleSubmit}>

            <label htmlFor="email">Email Address: </label>
            <input id = 'email' name='email' type="text" placeholder="email address" onChange={handleChange}/>

            <label htmlFor="pw">New Password: </label>
            <input id='pw' name='pw' type="text" placeholder="new password"onChange={handleChange}/>
            
            <label htmlFor="pw-confirm">Confirm Password: </label>
            <input id='pw-confirm' name='pw-confirm' type="text" placeholder="confirm new password" onChange={handleChange}/>

           <div className="dashboard-buttons">
                <button type="submit">Submit</button>
                <button name="settings" onClick={openAndClose}>Cancel</button>
           </div>
        </form>
    )
    );
};

export default Dashboard;