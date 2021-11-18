import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {DataContext} from '../../Utility/Context';
import '../../css/Timeline.css';
import { formatDate, filterByDate } from '../../Utility/DateUtil';

const Timeline = ( { dateRange } ) => {
    const {currentUser} = useContext(DataContext);
    const [timeline, setTimeline] = useState([]);
   

    const addDateProperty = async(array) => {
                return await array.map( (item) => {
                    item.dateInFormat = formatDate(item.start);
                    return item;
                });
    }

    useEffect( () => {
        const getMashup= async ()=>{
            //resets timeline every time useEffect is fired, to remove any duplicates.
            setTimeline([]);
            currentUser.viewing.map((event) => {
                event.dateInFormat = formatDate(event.start);
                return event;
            })
            currentUser.attending.map((event) => {
                event.dateInFormat = formatDate(event.start);
                return event;
            })

            const array = (currentUser.attending.concat(currentUser.viewing)).sort((a, b) => b.dateInFormat- a.dateInFormat);
    
            const nextArray = await addDateProperty(array);
            const lastArray = await filterByDate(nextArray, dateRange);
            setTimeline(lastArray);
        }
        getMashup();
    }, [dateRange]);


return (
    <>
	<div className="timeline">
        
    <div className='timeline-title'>
			<h1>Upcoming Events</h1>
			<Link to='/dashboard/create' className='btn' id="add-event">
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
