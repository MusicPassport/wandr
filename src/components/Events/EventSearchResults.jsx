import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const EventSearchResults = ({formstate}) => {
    const [events, setEvents] = useState([]);
    const history = useHistory();

    
    // let keyword = formstate.keyword ? `&keyword=${formstate.keyword}`:"";
    let keyword = `cheese string`
    let keyword2='string cheese'
    let keyword3 = `&keyword=${encodeURIComponent(keyword2)}`
    console.log(keyword3)
    // let postalCode = formstate.postalCode ? `&postalCode=${formstate.postalCode}`:"";
    // let city = formstate.city ? `&city=${formstate.city}` : "";
    // let state= formstate.stateCode ? `&stateCode=${formstate.stateCode}`:"";
    // let startDate= formstate.startDateTime ? `&startDateTime=${formstate.startDateTime }` :"";
    // let endDate= formstate.endDateTime ? `&endDateTime=${formstate.endDateTime }` :"";
    // let classification= formstate.classificationName ? `&endDateTime=${formstate.classificationName }` :"";


    //  let url=`https://app.ticketmaster.com/discovery/v2/events.json?size=100&keyword=music&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}${keyword}${postalCode}${city}${state}${startDate}${endDate}${classification}`

     let url=`https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}${keyword3}`
    // let url=`https://app.ticketmaster.com/discovery/v2/events.json?size=100&keyword=music&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`

    console.log(url)
    const getEvents = async () => {
        try {
            const result = await axios.get(url)
            console.log(result.data._embedded.events)
            // setEvents(([...result.data['_embedded'].events]))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
    if (events.length < 1) {
        getEvents()
    }
    // eslint-disable-next-line
}, [])
    
    return (
        <div>
            
        </div>
    );
};

export default EventSearchResults;