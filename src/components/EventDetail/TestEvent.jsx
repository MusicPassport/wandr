import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';
import './EventDetail.css';

function TestEvent(props) {
	const auth = localStorage.getItem('auth');
	const results = axios.post(
		`https://intense-island-04626.herokuapp.com/events`,
		{
			id: id,
			name: '123123',
			genre: '123123123',
			city: '112313',
			state: eventDetail['_embedded'].venues[0].state.name,
			address: eventDetail['_embedded'].venues[0].address.line1,
			tm_url: eventDetail.url,
			img_url: eventDetail.images[0].url,
			start: '2021-10-27T15:47:00Z',
			venue: null,
			attendees: [],
			viewers: [],
		},
		{
			headers: {
				Authorization: `Token  ${auth}`,
			},
		}
	);
	console.log('Results ', results);
	return <div></div>;
}

export default TestEvent;
