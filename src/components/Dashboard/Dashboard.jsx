import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {DataContext, DashContext} from '../../Utility/Context';
import { backendAPI } from '../../Utility/Config';

import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { DateRange } from 'react-date-range';
import './Dashboard.css';
import Timeline from '../Timeline/Timeline';
import Memories from '../Memories/Memories';
import BucketList from '../BucketList/BucketList';
import AltCalendar from '../Calendar/altCalendar';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Dashboard = () => {
    const [displaySettings, setDisplaySettings] = useState('memories');
    const [dateRange,setDateRange] = useState([]);
    const [selection, setSelection] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const openAndClose = (e) => {
        setDisplaySettings(e.target.name);
    }

    const formatDate = (date) => {
        let thisDate = date;
		let day = parseInt(thisDate[2]);
		let month = thisDate[1];
        let year = parseInt(thisDate[3]);
        console.log(day);
		let months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		]
		let monthNum = months.indexOf(month) +1;
        return {year: year, month: monthNum, day: day};
    }

    const setDates = async (data) => {
		 let startVal = await data.startDate.toString().split(' ');
         let endVal = await data.endDate.toString().split(' ');

         startVal = formatDate(startVal);
         endVal = formatDate(endVal);
        setDateRange(previousState => {
            return {...previousState, start: startVal, end: endVal}
        });
    }

  const handleSelect = async (ranges) => {
    setSelection(ranges['selection']);
    setDates(ranges['selection']);
    console.log(dateRange);

  }

    const display = () => {
        switch(displaySettings){
            case('calendar'):
                return(<DateRange
                scroll={{enabled: true}}
                ranges={[selection]}
                onChange={handleSelect}
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

            <DashContext.Provider value={{dateRange}}>
                {display()}
            </DashContext.Provider>
           
            </>
    )
};

export default Dashboard;