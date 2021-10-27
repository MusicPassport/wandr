import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './BucketList.css'


const BucketList = () => {
	// get the events in the users bucketlist
	// load the current user
	// load events in bucketlist
	// const { userId } = useParams();
    const userId = 1;
    const initialState= [{
        "id": 1,
        "username": "shelby",
        "email": "shelby@shelby.dev",
        "attending": [
        {
            "id": "1234",
            "name": "A New Event",
            "owner": "sahira",
            "genre": "Basketball",
            "city": "Brooklyn",
            "address": "Brooklyn, NY",
            "state": "NY",
            "tm_url": "tm.com",
            "venue": null,
            "img_url": "",
            "attendees": [
                1
            ],
            "viewers": [
                2
            ]
        }
    ],
    "viewing": [
        {
            "id": "12345",
            "name": "Billy Strings",
            "owner": "sahira",
            "genre": "Music",
            "city": "Denver",
            "address": "1234 Music way",
            "state": "CO",
            "tm_url": "tm.com",
            "venue": 'The Mission',
            "img_url": "https://archive.org/download/billystrings2021-10-15/119486.jpeg",
            "start": "2021-10-27T16:53:00Z",
            "attendees": [
                1
            ],
            "viewers": [
                2
            ]
        },
        {
            "id": "1234",
            "name": "A New Event",
            "owner": "sahira",
            "genre": "Basketball",
            "city": "Brooklyn",
            "address": "Brooklyn, NY",
            "state": "NY",
            "tm_url": "tm.com",
            "venue": null,
            "img_url": "https://news.utexas.edu/wp-content/uploads/2018/12/interior_LR.jpg",
            "start": "2021-10-27T16:53:00Z",
            "attendees": [
                1
            ],
            "viewers": [
                2
            ]
        },
        {
            "id": "1234",
            "name": "A New Event",
            "owner": "sahira",
            "genre": "Basketball",
            "city": "Brooklyn",
            "address": "Brooklyn, NY",
            "state": "NY",
            "tm_url": "tm.com",
            "venue": null,
            "img_url": "https://news.utexas.edu/wp-content/uploads/2018/12/interior_LR.jpg",
            "start": "2021-10-27T16:53:00Z",
            "attendees": [
                1
            ],
            "viewers": [
                2
            ]
        }
    ],
    "events": [],
    "memories": [
        {
            "id": 1,
            "title": "N/A",
            "body": "N/A",
            "photo": "https://wander-api-bass.s3.amazonaws.com/images/githublogo.png",
            "owner": "shelby",
            "event": "1234"
        }
    ]
}]
	const [currentUser, setCurrentUser] = useState(initialState);

    //Going to have a test object here:
    console.log(currentUser[0].viewing[0])
    let testUser = currentUser[0].viewing

    // will save the currentUser app and save as currentUser, pass down as currentUser in dataContext

	const getUser = async () => {
		const user = await axios.get(
			`https://intense-island-04626.herokuapp.com/users/${userId}`
		);
            console.log(user)
		setCurrentUser({ ...user.data[0] });
	};

	// useEffect(() => {
	// 	getUser();

	// });

	return (
		<div>
			<h3 className="greeting">Hey, {currentUser[0].username}!</h3>
            <h1>BucketList</h1>
            <div className="event-list">
                {testUser.map((event, index)=>
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
                    <button>Remove from Bucketlist</button>
                    <button>I'm going!</button>
                </div>
                
                )}
            </div>

		</div>
	);
};

export default BucketList;
