import { useState } from 'react';
import '../../css/Dashboard.css';
import DashNav from './DashNav';
import { DateRange } from 'react-date-range'; 
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import Timeline from '../Timeline/Timeline';

const Dashboard = ( { dateRange, setDateRange }) => {
    const [displaySettings, setDisplaySettings] = useState(window.screen.width > 600 ? 'flex' : 'none');

    const [selection, setSelection] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })


    const formatDate = (date) => {
        let thisDate = date;
		let day = parseInt(thisDate[2]);
		let month = thisDate[1];
        let year = parseInt(thisDate[3]); 
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
  }

const handleCal = () => {
    if(displaySettings === 'none') setDisplaySettings('flex');
    else setDisplaySettings('none');
}


    return (
        <>
        <div className="dashboard">
        
        <section className="dashboard-buttons">
               <DashNav />
            </section>
            <button id="cal-btn" onClick={ handleCal}></button>
            {displaySettings === 'flex' ? (
            <section style={{height: '425px'}} className='calendar'>
               <DateRange
                scroll={{enabled: false, months: 2}}
                style={{height: '375px'}}
                direction="horizontal"
                showDateDispay={false}
                ranges={[selection]}
                onChange={handleSelect}
                />
            </section>
            ) : ( null) }
            <div className="timeline-box">  
                <Timeline className="timeline" dateRange={dateRange} />
            </div>            
           
        </div>
        </>
           
    )
};

export default Dashboard;