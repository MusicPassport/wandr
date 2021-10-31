import axios from 'axios';
import { useEffect, useState, useContext } from 'react'
import { DataContext } from '../../Utility/Context.jsx';
import { useHistory, Link } from 'react-router-dom';
import EventSearch from './EventSearch.jsx';



const EventSearchResults = () => {
    const [events, setEvents] = useState([]);
    const history = useHistory();
    const { searchInputs, setSearchInputs } = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
    
    let keyword = searchInputs.keyword ? `&keyword=${encodeURIComponent(searchInputs.keyword)}`:""; 
    let postalCode = searchInputs.postalCode ? `&postalCode=${encodeURIComponent(searchInputs.postalCode)}`:"";
    let city = searchInputs.city ? `&city=${encodeURIComponent(searchInputs.city)}` : "";
    let state= searchInputs.stateCode ? `&stateCode=${encodeURIComponent(searchInputs.stateCode)}`:"";
    let startDate= searchInputs.startDateTime ? `&startDateTime=${encodeURIComponent(searchInputs.startDateTime)}T00:00:00Z` :"";
    let endDate= searchInputs.endDateTime ? `&endDateTime=${encodeURIComponent(searchInputs.endDateTime)}T00:00:00Z` :"";
    let classification= searchInputs.classificationName ? `&segment=${encodeURIComponent(searchInputs.classificationName) }` :"";


     let url=`https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=${process.env.REACT_APP_API_KEY}${keyword}${postalCode}${city}${state}${startDate}${endDate}${classification}`


    console.log(url)
    const getEvents = async () => {
        try {
            const result = await axios.get(url)
            setEvents(([...result.data['_embedded'].events]))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEvents()
    
}, [isOpen])
    
    return (
        <div>
            <button className={isOpen ? 'noToggle' : 'toggle'} onClick={()=>setIsOpen(!isOpen)}>Advanced Search</button>
            <div className={isOpen ? 'toggle' : 'noToggle'}>
                <EventSearch setIsOpen={setIsOpen} isOpen={isOpen}/>
            </div>
            <div className={isOpen ? 'noToggle' : 'toggle'}>
                Here's where the Events go
                {events.map((event) => (
					<Link className='event-link' to={`/events/${event.id}`}>
						<div className='img-container'>
							<img className='image' src={event.images[2].url} alt='' />
						</div>
						<h2>{event.name}</h2>
						<h4>{event.dates.status.code}</h4>
						<h4>{event._embedded.venues[0].name}</h4>
					</Link>
				))}

            </div>
        </div>
    );
};

export default EventSearchResults;