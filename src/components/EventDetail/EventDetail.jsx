import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';
import './EventDetail.css';

function EventDetail() {
	const { id } = useParams();
	const { events, setEvents, currentUser } = useContext(DataContext);
	const [eventDetail, setEventDetail] = useState();
	const [updateEvent, setUpdateEvent] = useState();

	const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`;

	useEffect(() => {
		// get events
		axios
			.get(url)
			.then((res) => setEventDetail({ ...res.data }))
			.catch((err) => console.log(err));
	}, []);

	

	const formatData = async () => {
		const newEvent = {
			id: id,
			name: eventDetail.name,
			genre: eventDetail.genre,
			owner: currentUser.username,
			summary: 'eventDetail.promoter.description',
			city: eventDetail['_embedded'].venues[0].city.name,
			state: eventDetail['_embedded'].venues[0].state.name,
			address: eventDetail['_embedded'].venues.address[0].line1,
			tm_url: eventDetail.url,
			img_url: eventDetail.images[0].url,
			eventId: eventDetail.id,
			start: eventDetail.dates.start.localDate,
			venue: eventDetail.venues[0].name,
			attendees: [],
			viewers: [],
		};
		return newEvent;
	};

	// const addSeen = async () => {
	// 	// send a request to update the user detail to include the current user in the events attendees
	// 	try {
	// 		const event = await axios.get(
	// 			`https://intense-island-04626.herokuapp.com/events/${id}`
	// 		);
	// 		console.log('Found!');
	// 		setUpdateEvent({ ...event.data });
	// 		axios.put(`https://intense-island-04626.herokuapp.com/events/${id}`, {
	// 			...updateEvent,
	// 			attendees: [...updateEvent.attendees, currentUser],
	// 		});
	// 	} catch (error) {
	// 		console.log('Not Found!');
	// 		axios.post(`https://intense-island-04626.herokuapp.com/events`, {
	// 			...formatData(),
	// 			attendees: [...updateEvent.attendees, currentUser],
	// 		});
	// 	}
	// };

	const addEvent= async (event) => {
		// send a request to update the user detail to include the current user in the events viewers
		try {
			const auth = localStorage.getItem('auth')
			const event = await axios.get(
				`https://intense-island-04626.herokuapp.com/events/${id}`,
			);
			console.log('Found!');
			setUpdateEvent({ ...event.data });
			axios.put(`https://intense-island-04626.herokuapp.com/events/${id}/`, {
				...updateEvent,
				[event.target.id]: [...updateEvent[event.target.id], currentUser],
			}, {
			headers: {
				Authorization: `Token  ${auth}`,
			}});
		} catch (error) {
			console.log('Not Found!');
			axios.post(`https://intense-island-04626.herokuapp.com/events/`, {
				...formatData(),
				[event.target.id]: [...updateEvent[event.target.id], currentUser],
			});
		}
	};

	if (!eventDetail) {
		return <h1>Loading...</h1>;
	}

	//display the event detail in a card
	return (
		<div className='details-container'>
			<div className='images-container'>
				<img
					className='event-img'
					src={eventDetail.images[1].url}
					alt={`${eventDetail.name} + promo`}></img>
			</div>
			<div className='info-container'>
				<h2>{eventDetail.name}</h2>
				<p className='start'>Start Date: {eventDetail.dates.start.localDate}</p>
				<div className='detail-btns'>
					<button className='btn detail-btn bucket' id='viewers' onClick={addEvent}>
						Add To BucketList
					</button>
					<button className='btn detail-btn seen' id='attendees' onClick={addEvent}>
						Add To Seen
					</button>
					<a target='_blank' href={eventDetail.url}>
						<button className='btn detail-btn tickets'>View Tickets</button>
					</a>
				</div>
				<h3>Seat Map</h3>
				{eventDetail.seatmap ? (
					<div className='seat-map'>
						<img
							className='event-img seat-img'
							src={eventDetail.seatmap.staticUrl}
							alt={`${eventDetail.name} + seat map`}></img>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default EventDetail;
