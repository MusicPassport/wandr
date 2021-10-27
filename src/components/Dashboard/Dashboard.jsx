import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
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
        memories: false,
        email: false,
        password: false
    });
    const [dateValue, setDateValue] = useState(null);
    const [minDate, setminDate] = useState(null);
    const [maxDate, setmaxDate] = useState(null);
    const [memories,setMemories] = useState();

    useEffect(() => {
        console.log('current user: ',currentUser);
        setMemories(currentUser.memories);
    })


    const openAndClose = (e) => {
        let value = displaySettings[e.target.name];
        setDisplaySettings({...displaySettings, [e.target.name]: !value});
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
       <>
            <Link to="/dashboard/reset-email" >Change Email Address</Link>
            <Link to="/dashboard/reset-password">Change Password</Link>
        </>

    )
    );
};

export default Dashboard;