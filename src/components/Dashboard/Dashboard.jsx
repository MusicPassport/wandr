import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {DataContext, DashContext} from '../../Utility/Context';
import { backendAPI } from '../../Utility/Config';

import { CalendarComponent, DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import './Dashboard.css';
import Timeline from '../Timeline/Timeline';
import Memories from '../Memories/Memories';
import BucketList from '../BucketList/BucketList';

const Dashboard = () => {

    const { currentUser } = useContext(DataContext);

    const [displaySettings, setDisplaySettings] = useState('memories');
    const [dateValue, setDateValue] = useState(null);
    const [minDate, setminDate] = useState(null);
    const [maxDate, setmaxDate] = useState(null);

    const openAndClose = (e) => {
        let value = displaySettings[e.target.name];
        // setDisplaySettings({...displaySettings, [e.target.name]: !value});
        setDisplaySettings(e.target.name);
        console.log(e.target.name);
    }

    const getEvent = async (memory) => {
            try {
                axios.get(`${backendAPI}/events/${memory.event}` )
            } catch(err) {
                console.log(err);
            }
    }

    const display = () => {
        switch(displaySettings){
            case('calendar'):
                return(<CalendarComponent
                className='personal-calendar'
                value={dateValue}
                min={minDate}
                max={maxDate}
                isMultiSelection={true}
                />);
            case('settings'):
                return (
                    <Link to="/dashboard/reset-password">Change Password</Link>
                );
            case('timeline'):
                return(<Timeline/>);
            case('bucketlist'):
                return( <BucketList/>);
            default:
                return ( <Memories/>);
        }
    }

    return (
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
            <DashContext.Provider value={{
                dateValue,
                minDate,
                maxDate
            }}>
                 <DateRangePickerComponent placeholder="pick a date range"></DateRangePickerComponent>
                {display()}
            </DashContext.Provider>
           
            </>
    )
};

export default Dashboard;