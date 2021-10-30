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
		
			<div>
				<button onClick={() => history.goBack()}>←</button>	

				{events.map((event) => (
					// <div>
					// 	<h3>{event.name}</h3>
					// 	<h5>{event['_embedded'].venues[0].name}</h5>
					// 	<p>{event.dates.start.localDate}</p>
					// 	<p>{event.dates.status.code}</p>
					// </div>
					
					<Card className='card card-container' style={{ width: '22rem' }}>
						<Card.Img
							variant='top'
							src={event.images[3].url}
							style={{ height: '100px' }}
							className='detail-img'
						/>
						<div className='card-body'>
							<div className='title'>
								<div className='title-container'>
									<h3>{event.name}</h3>
								</div>
							</div>
							<div className='info'>
								<div className='details'>
									<h5>{event['_embedded'].venues[0].name}</h5>
									<div>
										<p className='date'>Date: {event.dates.start.localDate}</p>
									</div>
								</div>
								<div>
									<p className='status'>{event.dates.status.code}</p>
									<Link to={`/events/${event.id}`}>
										<Button variant='outline-success'>More Details</Button>
									</Link>
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>
		);
}

export default DiscoverDetail;
