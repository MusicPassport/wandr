import { useState } from 'react';
import { DateRange } from 'react-date-range'; 
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { setDates } from '../../Utility/DateUtil';

const Calendar = ( { setDateRange }) => {

    const [selection, setSelection] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const [displaySettings, setDisplaySettings] = useState(window.screen.width > 600 ? 'flex' : 'none');

    const handleCal = () => {
        if(displaySettings === 'none') setDisplaySettings('flex');
        else setDisplaySettings('none');
    }

    const handleReset = async () => {
        setDates(null, setDateRange);
    }

    const handleSelect = async (ranges) => {
        setSelection(ranges['selection']);
        setDates(ranges['selection'], setDateRange);
    }

    return (
        <>
        {/* make this btn an input type = "image" */}
        <button id="cal-btn" onClick={handleCal}></button>
        {/* <input type="image" id="cal-btn" src='../../assets/cal-icon.jpeg' alt="calendar" width="48" height="48" /> */}
            { displaySettings === 'flex' ? (
            <section className='calendar'>
                <button id="cal-reset" onClick={handleReset}>Reset Calendar</button>
               <DateRange
                scroll={{enabled: false, months: 2}}
                style={{height: '250px', margin: '0 1em'}}
                direction="horizontal"
                showDateDispay={false}
                ranges={[selection]}
                onChange={handleSelect}
                />
            </section>
             ) : ( null) 
            }
        </>
    );
};

export default Calendar;