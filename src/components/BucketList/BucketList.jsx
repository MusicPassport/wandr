import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { backendAPI } from '../../Utility/Config';
import { DataContext } from '../../Utility/Context.jsx';
import { useHistory } from 'react-router';
import '../../css/BucketList.css';
import DashNav from '../Dashboard/DashNav';



const BucketList = () => {

	const { currentUser, updateUser } = useContext(DataContext);
    const [updateEvent, setUpdateEvent] = useState();
    const [waitUntilLoad, setWaitUntilLoad] = useState(true);
    const history = useHistory();

    useEffect(() => {
        updateUser();
        let timeout = setTimeout(() => setWaitUntilLoad(false), 1000)
        

        return () => {
        }
    }, [])

    const removeFromBucket = async (event) => {
        try {

            const url = `${backendAPI}/events/${event.target.id}`

     
            const targetEvent = await axios
            .get(url)
            const newEvent ={...targetEvent.data, viewers: [...targetEvent.data.viewers.filter(user => user !== currentUser.id)]}
                
            const auth = localStorage.getItem('auth')
            let res = await axios
            .put(url, newEvent,{
        headers: {
            Authorization: `Token ${auth}`,
        }
        } )
        updateUser();

        } catch (error) {
            console.log(error)
        }

    }
    const addEvent = async (event) => {
		// send a request to update the user detail to include the current user in the events viewers
		const auth = localStorage.getItem('auth');
        
		try {
			await axios.get(
				`https://intense-island-04626.herokuapp.com/events/${event.target.id}`
			)
            .then(res => setUpdateEvent(res.data))

             const update = {
                ...updateEvent,
				attendees: [parseInt(currentUser.id)],viewers: [...updateEvent.viewers.filter(user => user !== currentUser.id)]
            }

			let res = await axios.put(
					`https://intense-island-04626.herokuapp.com/events/${event.target.id}`,
					update,
					{
						headers: {
							Authorization: `Token  ${auth}`,
						},
					}
				)
                
                updateUser();
                
		} catch (error) {
		console.log(error)
		}
	
	}
    if (waitUntilLoad){
        return(
        <h2 className="bucketListTitle">Loading...</h2>
        )
    } else{

	return (
		<div>
            <DashNav />
            <div className="topImageContainer">
                <img className="topImage" src="https://wallpapermemory.com/uploads/223/hot-air-balloon-background-full-hd-1080p-478513.jpg" alt="" />
            </div>
            <div  className="BLPage">
            <button className="backButton" onClick={()=> history.goBack()}>←</button>
            <h1 className="bucketListTitle">BucketList</h1>
            <div className="bucket-event-list">
                {currentUser.viewing.map((event, index)=>
                <div className="event-link blEvent" key={`${event} - ${index}`}>
                    <div className="img-container"> 
                        <img className="image blImage" src={event.img_url} alt=""/> 
                    </div>
                    <h2 className="blEventName">{event.name}</h2>
                    <h4>{event.genre}</h4>
                    <h4>{event.city}, {event.state}</h4>
                    <h4>{event.start}</h4>
                    <h4>{event.venue}</h4>
                    <a href={event.tm_url}>Get your tickets here!</a>
                    <button className='btn detail-btn bucketButton' onClick={removeFromBucket} id={event.id}>Remove from Bucketlist</button>
                    <button
						className='btn detail-btn seen bucketButton'
						id={event.id}
						onClick={addEvent}>
						Add To Attending
					</button>
                </div>
                )}
            </div>
        </div>
		</div>
	);
    }
};

export default BucketList;
