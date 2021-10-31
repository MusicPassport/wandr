import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';
import DiscoverDetail from './DiscoverDetail';
import landing from '../../assets/discover.jpg'

const Discover = () => {

	const [sports, setSports] = useState();
	const [inYourArea, setInYourArea] = useState();
	const [films, setFilms] = useState();
	const [suggest, setSuggest] = useState();
	const [music, setMusic] = useState();
	const [misc, setMisc] = useState();

	function getLocation() {
		window.navigator.geolocation.getCurrentPosition(console.log, console.log);
		// navigator.geolocation.getCurrentPosition(function (position) {
		// 	console.log('Latitude is :', position.coords.latitude);
		// 	console.log('Longitude is :', position.coords.longitude);
		// });
	}



	useEffect(() => {
		getInYourArea();
        getSports();
        getMusic();
        getFilm();
        // getMisc();
		// getLocation()
	}, []);

	const getSuggest = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/suggest?apikey=${process.env.REACT_APP_API_KEY}`
		);
		console.log(res.data['_embedded'].attractions);
	};

	const getSports = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&random=true&apikey=${process.env.REACT_APP_API_KEY}`
		);
		console.log(res.data['_embedded'].events);
        setSports(res.data['_embedded'].events);
	};

	const getMusic = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=music&random=true&apikey=${process.env.REACT_APP_API_KEY}`
		);
		console.log(res.data['_embedded'].events);
        setMusic(res.data['_embedded'].events);
	};

	const getInYourArea = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_API_KEY}&radius=100&locale=*&startDateTime=2021-10-28T21:42:00Z&endDateTime=2021-11-28T21:43:00Z&city=brooklyn&segmentName=music`
		);
		console.log(res.data['_embedded'].events);
		setInYourArea([...res.data['_embedded'].events]);
	};

	const getMisc = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=miscellaneous&apikey=${process.env.REACT_APP_API_KEY}`
		);

        setMisc(res.data['_embedded'].events);
	};

	const getFilm = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=film&apikey=${process.env.REACT_APP_API_KEY}`
			// https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_API_KEY}&radius=100&locale=*&daterange=from20211030-to-20211106&city=brooklyn&segmentName=music
		);

		console.log(res);
        setFilms(res.data['_embedded'].events);
	};

	return (
		<div>
			<div className='discover-landing'>
				<h2 className='landing-title'>Discover Something New</h2>		
			</div>
			<div className='main-div'>
				<h2 className='discover-section-title'>In Your Area</h2>
				<DiscoverDetail events={inYourArea} />
				<div>{/* map In Your Area Results */}</div>
				{/* <h2>Suggested Attractions</h2>
			<DiscoverDetail props={inYourArea} />
			<div></div> */}
				{/* <h2 className='discover-section-title'>Dive Into Something New</h2> */}
				<div className='discover-section-title'>
					{/* map In Your Area Results */}
				</div>
				{/* <DiscoverDetail events={misc} /> */}
				<h2 className='discover-section-title'>For Music Lovers</h2>
				<div>{/* map In Your Area Results */}</div>
				<DiscoverDetail events={music} />
				<h2 className='discover-section-title'>For Cinephiles</h2>
				<div>{/* map In Your Area Results */}</div>
				<DiscoverDetail events={films} />
				<h2 className='discover-section-title'>For Sports Fans</h2>
				<DiscoverDetail events={sports} />
			</div>
		</div>
	);
};

export default Discover;
