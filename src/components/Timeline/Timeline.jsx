import { useState, useEffect, useContext } from 'react';
import {DataContext} from '../../Utility/Context';
import {DashContext} from '../../Utility/Context'

const Timeline = () => {
    const {currentUser} = useContext(DataContext);
    const { dateRange } = useContext(DashContext);
    const [timeline, setTimeline] = useState([]);
    
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
                <img src={event.img_url} style={{width: '100%'}} alt="alt" />
                <p>{event.start}</p>
                </>
            )}
        )}
            
        </div>
    );
}

export default Timeline
