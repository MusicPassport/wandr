import React, { useState } from 'react'


const Timeline = () => {
const [timeline, setTimeline] = useState([{name: 'BASS', description: 'awesome project', start: 'Aug 9', end: 'Nov 1'}]);
// const url = ????  ;
const [input, setInput] = useState();

// const getEvents = async () => {
//     try {
//         const events = axios.get(url);
//         setTimeline(events);
//     } catch(err) {
//         console.log(err);
//     }
// }

// useEffect(() => {
//     getEvents()
// }, [input]);

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
    )
}

export default Timeline
