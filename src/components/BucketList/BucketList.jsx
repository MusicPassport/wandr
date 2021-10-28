import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { backendAPI } from '../../Utility/Config';
import { DataContext } from '../../Utility/Context.jsx';

import './BucketList.css'


const BucketList = () => {
	// get the events in the users bucketlist
	// load the current user
	// load events in bucketlist
    // const userId = 1;
	const { currentUser, setCurrentUser } = useContext(DataContext);
    const [eventDetail, setEventDetail] = useState();
	const [updateEvent, setUpdateEvent] = useState();
    const id = currentUser.id;

    console.log(currentUser.viewing);

    const removeFromBucket = async (event) => {
        try {
            console.log(event.target.id)
            console.log(currentUser)
            const url = `${backendAPI}/events/${event.target.id}`
            console.log(url)
     
            await axios
            .get(url)
            .then((res) => setEventDetail({ ...res.data }))
            // .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
                
            console.log(eventDetail.viewers)
            let index = eventDetail.viewers.indexOf(id);
            eventDetail.viewers.splice(index,1);
            console.log(eventDetail)

            let config = {
            headers: {
                Authorization: localStorage.getItem('auth')
            }
            }
            axios
                .put(url,config, eventDetail )
            
        } catch (error) {
            console.log(error)
        }
            
        // }
    }

       	const formatData = async () => {
		const newEvent = {
			id: eventDetail.id,
			name: eventDetail.name,
			genre: eventDetail.genre,
			owner: eventDetail.owner,
			city: eventDetail.city,
			state: eventDetail.state,
			address: eventDetail.address,
			tm_url: eventDetail.tm_url,
			img_url: eventDetail.img_url,
			start: eventDetail.start,
			venue: eventDetail.venue,
			attendees: eventDetail.attendees,
			viewers: eventDetail.viewers,
		};
		return newEvent;
	

   
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



       // let ind = currentUser.viewing.findIndex(id => id === event.target.id);
        // for (let i = 0; i < currentUser.viewing.length; i++) {
        //     if (currentUser.viewing[i].id === event.target.id) {
        //         console.log(currentUser.viewing[i])
        //         console.log(i)
        //         currentUser.viewing.splice(i,1)
        //     }