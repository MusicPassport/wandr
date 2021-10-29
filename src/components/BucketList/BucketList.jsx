import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { backendAPI } from '../../Utility/Config';
import { DataContext } from '../../Utility/Context.jsx';
import { useHistory } from 'react-router';
import './BucketList.css'


const BucketList = () => {

	const { currentUser, setCurrentUser, updateUser } = useContext(DataContext);
    const [updateEvent, setUpdateEvent] = useState();
    const [waitUntilLoad, setWaitUntilLoad] = useState(true);
    const history = useHistory();
    let update;

    useEffect(() => {
        updateUser();
        let timeout = setTimeout(() => setWaitUntilLoad(false), 1000)
        

        return () => {
        }
    }, [])

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
        updateUser();

        } catch (error) {
            console.log(error)
        }

    }
    const addEvent = async (event) => {
		// send a request to update the user detail to include the current user in the events viewers
		const auth = localStorage.getItem('auth');
		console.log(event.target.id);
        
		try {
			await axios.get(
				`https://intense-island-04626.herokuapp.com/events/${event.target.id}`
			)
            .then(res => setUpdateEvent(res.data))

            console.log(updateEvent)
            // console.log(eventToUpdate)
			// const update = await setUpdateEvent((previousState) => {
            //     return{...previousState, ...eventToUpdate.data }});

            const updated = () => {
                update = {
                ...updateEvent,
				attendees: [parseInt(currentUser.id)],viewers: [...updateEvent.viewers.filter(user => user !== currentUser.id)]
            }
            return update
            }
            let timeout = setTimeout(() => updated(), 3000)
            // if(Object.keys(updated).length<13){
            //     console.log('waiting')
            // }
            console.log(Object.keys(update).length)
			console.log('Updated Event:', update);
			
			// let res = await axios.put(
			// 		`https://intense-island-04626.herokuapp.com/events/${event.target.id}`,
			// 		updated,
			// 		{
			// 			headers: {
			// 				Authorization: `Token  ${auth}`,
			// 			},
			// 		}
			// 	)

                // removeFromBucket();
                
                updateUser();
                
		} catch (error) {
		console.log(error)
		}
	
	}
    if (waitUntilLoad){
        return(
        <h2>Loading...</h2>
        )
    } else{

	return (
		<div>
            <button onClick={()=> history.goBack()}>←</button>
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
                    <button
						className='btn detail-btn seen'
						id={event.id}
						onClick={addEvent}>
						Add To Attending
					</button>
                </div>
                 
                )}
            </div>

		</div>
	);
    }
};

export default BucketList;
