import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const EventSearchResults = ({formstate}) => {
    const [events, setEvents] = useState([]);
    const history = useHistory();

    // let keyword = formstate.keyword ? `&keyword=${formstate.keyword}`:"";
    let keyword = `&keyword=billystrings`
    // let postalCode = formstate.postalCode ? `&postalCode=${formstate.postalCode}`:"";
    // let city = formstate.city ? `&city=${formstate.city}` : "";
    // let state= formstate.stateCode ? `&stateCode=${formstate.stateCode}`:"";
    // let startDate= formstate.startDateTime ? `&startDateTime=${formstate.startDateTime }` :"";
    // let endDate= formstate.endDateTime ? `&endDateTime=${formstate.endDateTime }` :"";
    // let classification= formstate.classificationName ? `&endDateTime=${formstate.classificationName }` :"";


    //  let url=`https://app.ticketmaster.com/discovery/v2/events.json?size=100&keyword=music&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}${keyword}${postalCode}${city}${state}${startDate}${endDate}${classification}`

     let url=`https://app.ticketmaster.com/discovery/v2/events.json?size=100&keyword=music&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}${keyword}`
    
    console.log(url)

    useEffect(()=> {
        fetch(url)
            .then(res=>res.json())
            .then(res=> {
                console.log(res)
                // setEvents(res)                
            })
            .catch(err=> {
            console.log(err)
        })  
        //eslint-disable-next-line
    }, [url])
    
    return (
        <div>
            
        </div>
    );
};

export default EventSearchResults;