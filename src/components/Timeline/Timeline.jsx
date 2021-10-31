import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {DataContext} from '../../Utility/Context';
import '../../css/Timeline.css';

const Timeline = ( { dateRange } ) => {
    const {currentUser} = useContext(DataContext);
    const [timeline, setTimeline] = useState([]);
    
    const formatDate=  (date) => {
        let myEvent = date.split("-");
        let myYear = parseInt(myEvent[0]);
        let myMonth = parseInt(myEvent[1]);
        let myDay = parseInt(myEvent[2]);
        return {year: myYear, month: myMonth, day: myDay};
   
    }
    const checkStartDate = (date) => {
         if (date.year > dateRange.start.year) return true;
        if (date.year === dateRange.start.year && date.month > dateRange.start.month) return true;

        if (date.year === dateRange.start.year && 
            date.month === dateRange.start.month && 
            date.day >= dateRange.start.day) return true;
        return false;
    }

    const checkEndDate = (date) => {
         if (date.year < dateRange.end.year) return true;
        if (date.year === dateRange.end.year && date.month < dateRange.end.month) return true;
        
        if (date.year === dateRange.end.year && 
            date.month === dateRange.end.month && 
            date.day <= dateRange.end.day) return true;
        return false;
    }

    const checkDate = (date) => {
        if(!dateRange) return true;
       if(checkStartDate(date) && checkEndDate(date)) return true;
       return false;
    }

    const addDateProperty = async(array) => {
                return await array.map( (item) => {
                    item.date = formatDate(item.start);
                    return item;
                });
    }

    const filterArrays = async(array) => {
       return await array.filter((event) => checkDate(event.date))
    }

    
    useEffect( () => {
        const getMashup= async ()=>{
            const strToDateViewing = currentUser.viewing.map((event) => {
                event.dateInFormat = event.start.split('-').join('')
                return event
            })
            const strToDateAttending = currentUser.attending.map((event) => {
                event.dateInFormat = event.start.split('-').join('')
                return event
            })

            const array = (currentUser.attending.concat(currentUser.viewing)).sort((a, b) => b.dateInFormat- a.dateInFormat);
    
            const nextArray = await addDateProperty(array);
            const lastArray = await filterArrays(nextArray);
            setTimeline(lastArray);
        }
        getMashup();
    }, [dateRange]);


return (
    <>
	<div className="timeline">
        
    <div className='timeline-title'>
			<h1>Upcoming Events</h1>
			<Link to='/dashboard/create' className='btn add-memory'>
				Add Event
			</Link>
		</div>
		
        
		{timeline.length ? (
			timeline.map((event) => {
				return (
					<Link
						className='timeline-link'
						key={event.id}
						to={`/events/${event.id}`}>
                        <p className="timeline-date">{event.start}</p>
                        <img  className='timeline-img' src={event.img_url} style={{ width: '100%' }} alt='alt' />
						<h5 className="timeline-event-title">{event.name.length > 30 ? `${event.name.substring(0, 31).concat('...')}` : event.name }</h5>
					</Link>
				);
			})
		) : (
			<h1>No Events yet!</h1>
		)}
	</div>
    </>
);
}

export default Timeline
