import React from 'react';
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../css/DiscoverDetail.css'
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'

const DiscoverDetail = ({ events }) => {
    console.log("Events!", events)
	let history = useHistory()

    if (!events) {
			return <h2>Loading..</h2>;
		}
    return (
			<div className='display'>
				{events.map((event, idx) => (
					<div id={`discover-${idx}`} className='card-body'>
						<Link to={`events/${event.id}`}>
							<img className='details-image' src={event.images[0].url}></img>
						</Link>
						<div className='discover-title'>
							<h2 className='discover-title'>{event.name}</h2>
							<p>Starting: {event.dates.start.localDate}</p>
						</div>
					</div>
				))}
			</div>
		);
}

export default DiscoverDetail;
