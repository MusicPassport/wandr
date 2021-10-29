import { useState, useEffect, useContext } from 'react';
import {DataContext} from '../../Utility/Context';
import {DashContext} from '../../Utility/Context'

const Timeline = () => {
    const {currentUser} = useContext(DataContext);
    const { dateRange } = useContext(DashContext);
    const [timeline, setTimeline] = useState([]);

    // const checkDate = () => {
    //      if( dateRange.start.year > date.year || date.year > dateRange.end.year) return false;
    //     if (dateRange.end.year < date.year) return false;
    //     if(dateRange.end.year < date.year) console.log('wow');
    //     if(dateRange.start.year > date.year || date.year > dateRange.end.year) return false;
    //     if(dateRange.start.year === date.year && dateRange.start.month > date.month) return false;
    //     if(dateRange.end.year === date.year && dateRange.end.month < date.month) return false;
    //     if(dateRange.start.month === date.day && dateRange.start.day > date.day) return false;
    //     if(dateRange.end.month === date.day && dateRange.end.day < date.day) return false;
    //     return true;
    // }
    
    // const formatDate= async (event) => {
    //     if(!dateRange.start) return true;
    //     let myEvent = await event.start.split("-");
    //     let myYear = parseInt(myEvent[0]);
    //     let myMonth = parseInt(myEvent[1]);
    //     let myDay = parseInt(myEvent[2]);
    //     console.log('start year: ',dateRange.start.year,'myYear', myYear, 'end year: ', dateRange.end.year);
    //     return {year: myYear, month: myMonth, day: myDay};
    // }


  
    useEffect( () => {
        if(currentUser.attending.length) setTimeline((currentUser.attending.concat(currentUser.viewing)).sort((a, b) => b.start- a.start));
    }, []);



return (
    <div>
         <h1>{timeline.length ? 'Hello from Timeline' : 'No timeline yet'}</h1>
        {timeline && timeline.map( event => {
                       return  (
                            <>
                            <h2>{event.name}</h2>
                            <p>{event.start}</p>
                            </>
                        )
            }
        )}
            
        </div>
    );
}

export default Timeline
