import { useState, useEffect, useContext } from 'react';
import {DataContext} from '../../Utility/Context';

const Timeline = () => {
    const {currentUser} = useContext(DataContext);
    const [timeline, setTimeline] = useState([]);


  
    useEffect( () => {
        console.log(currentUser);
        if(currentUser.attending.length) setTimeline((currentUser.attending.concat(currentUser.viewing)).sort((a, b) => b.start- a.start));
    }, []);

const [input, setInput] = useState();

if(!timeline.length) return(<h1>No Events yet</h1>);

return (
    <div>
         <h1>{timeline.length ? 'Hello from Timeline' : 'No timeline yet'}</h1>
        {timeline && 
            timeline.map(event => {
            return(
                <>
                <h2>{event.name}</h2>
                <p>{event.start}</p>
                </>
            )
        })}
            
        </div>
    );
}

export default Timeline
