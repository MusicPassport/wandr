import { useState, useEffect, useContext } from 'react';
import {DataContext} from '../../Utility/Context';

const Timeline = () => {
    const {currentUser} = useContext(DataContext);
    const [timeline, setTimeline] = useState();

    useEffect( () => {
        if(currentUser.events.length) setTimeline(currentUser.events);
    }, []);

const [input, setInput] = useState();

if(!timeline) return(<h1>No Events yet</h1>);

return (
    <div>
        <h1>Hello from Timeline</h1>
        {timeline.map(event => {
            return(
                <>
                <h2>{event.name}</h2>
                <p>{event.start} to {event.end}</p>
                </>
            )
        })}
            
        </div>
    );
}

export default Timeline
