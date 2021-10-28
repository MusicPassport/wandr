import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { backendAPI } from '../../Utility/Config';
import { DataContext } from '../../Utility/Context.jsx';

import './BucketList.css'


const BucketList = () => {

	const { currentUser, setCurrentUser } = useContext(DataContext);

    const removeFromBucket = async (event) => {
        try {
            console.log(event.target.id)
            console.log(currentUser)
            const url = `${backendAPI}/events/${event.target.id}`
            console.log(url)
     
            const targetEvent = await axios
            .get(url)
            console.log(targetEvent.data.viewers)
            const newEvent ={...targetEvent.data, viewers: [...targetEvent.data.viewers.filter(user => user !== currentUser.id)]}
                
            const auth = localStorage.getItem('auth')
            let res = await axios
            .put(url, newEvent,{
        headers: {
            Authorization: `Token ${auth}`,
        }
        } )
            console.log(res)

        } catch (error) {
            console.log(error)
        }

    }

	return (
		<div>
			<h3 className="greeting">Hey, {currentUser.username}!</h3>
            <h1>BucketList</h1>
            <div className="event-list">
                {currentUser.viewing.map((event, index)=>
                <div className="event-link" key={`${event} - ${index}`}>
                    <div className="img-container"> 
                        <img className="image" src={event.img_url} alt=""/> 
                    </div>
                    <h2>{event.name}</h2>
                    <h4>{event.genre}</h4>
                    <h4>{event.city}, {event.state}</h4>
                    <h4>{event.start}</h4>
                    <h4>{event.venue}</h4>
                    <a href={event.tm_url}>Get your tickets here!</a>
                    <button onClick={removeFromBucket} id={event.id}>Remove from Bucketlist</button>
                    <button>I'm going!</button>
                </div>
                 
                )}
            </div>

		</div>
	);
};

export default BucketList;
