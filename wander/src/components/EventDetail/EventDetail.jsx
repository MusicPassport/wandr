import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EventDetail() {
    // const { id } = useParams();
    const [details,setDetails] = useState({});
    const url = `https://intense-island-04626.herokuapp.com/events/2`

    const addEvent = () => {
        // add event to users events 
    }
    
    const  getDeets = async() => {
        try {   
            const deets = await axios.get(url);
            setDetails(deets.data)
            console.log(deets.data)

        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getDeets();
    },[])
    // on click, add event to the users "events" array

    // on click, remove from events list
    
    const handleDelete = async () => {
        try {
           const deleted = await axios.delete(url)
           console.log('you deleted: ',deleted);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <img src={details.img_url} alt={details.name} />
            <h2>{details.event_name}</h2>
            <p>{details.summary}</p>
            <p>{details.city}</p>
            <p>{details.eventbrite_url}</p>
            <p>{details.start} - {details.end}</p>
            <p>{details.status}</p>
            
        </div>
    );
};

export default EventDetail;