import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import { useHistory } from 'react-router';
import axios from 'axios';
import '../../css/BucketList.css'

const Seen = () => {
    const {currentUser, setCurrentUser, updateUser} = useContext(DataContext)
    const [event, setEvent] = useState()
	const history = useHistory();

    const deleteEvent = async (event) => {
        const id = event.target.id
        const targetEvent = await axios.get(`https://intense-island-04626.herokuapp.com/events/${id}`)
        const newEvent = {...targetEvent.data, attendees: [...targetEvent.data.attendees.filter(user => user !== currentUser.id)]}
        const auth = localStorage.getItem('auth')
        const config = {
					headers: {
						Authorization: `Token  ${auth}`,
					},
				};
        // send to back end
        let res = await axios.put(
					`https://intense-island-04626.herokuapp.com/events/${id}`, newEvent, config
				);

        console.log(res)

        // update user 
        updateUser()
    
    }

	return (
		<div>
			<div className="topImageContainer">
				<img className="topImage " src="https://i.imgur.com/VLHSzTL.jpg?1" alt="" />
			</div>
			<div  className="BLPage">
				<button className="backButton" onClick={()=> history.goBack()}>←</button>
			<h1 className="bucketListTitle">Attending</h1>
			<div className='bucket-event-list'>
				{currentUser.attending.map((event, index) => (
					<div className='event-link blEvent' key={`${event.id}`}>
						<div className='img-container'>
							<img className='image blImage' src={event.img_url} alt='' />
						</div>
						<h2>{event.name}</h2>
						<h4>{event.genre}</h4>
						<h4>
							{event.city}, {event.state}
						</h4>
						<h4>{event.start}</h4>
						<h4>{event.venue}</h4>
						<a href={event.tm_url}>Get your tickets here!</a> <br/>
						<button className='btn detail-btn bucketButton' id={event.id} onClick={deleteEvent}>Remove from Seen</button>
					</div>
				))}
			</div>
			</div>
		</div>
	);
};

export default Seen;
