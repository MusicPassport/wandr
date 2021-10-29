import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';
import DiscoverDetail from './DiscoverDetail';

const Discover = () => {
	// get events in the area
	const [sports, setSports] = useState();
	const [inYourArea, setInYourArea] = useState();
	const [films, setFilms] = useState();
	const [suggest, setSuggest] = useState();
	const [music, setMusic] = useState();
	const [misc, setMisc] = useState();

	useEffect(() => {
		getInYourArea();
        // getSports();
        // getMusic();
        // getFilm();
        // getMisc();
	}, []);

	const getSuggest = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/suggest?apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`
		);
		console.log(res.data['_embedded'].attractions);
	};

	const getSports = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&random=true&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`
		);
		console.log(res.data['_embedded'].events);
        setSports(res.data['_embedded'].events);
	};

	const getMusic = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=music&apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB`
		);
		console.log(res.data['_embedded'].events);
        setMusic(res.data['_embedded'].events);
	};

	const getInYourArea = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events?apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB&radius=100&locale=*&startDateTime=2021-10-28T21:42:00Z&endDateTime=2021-11-28T21:43:00Z&city=brooklyn&segmentName=music`
		);
		console.log(res.data['_embedded'].events);
		setInYourArea([...res.data['_embedded'].events]);
	};

	const getMisc = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=miscellaneous&apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB`
		);

        setMisc(res.data['_embedded'].events);
	};

	const getFilm = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=film&apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB`
			// https://app.ticketmaster.com/discovery/v2/events?apikey=RW9cwwI0fopdanO8UIpgzYPYq0GlSavB&radius=100&locale=*&daterange=from20211030-to-20211106&city=brooklyn&segmentName=music
		);

		console.log(res);
        setFilms(res.data['_embedded'].events);
	};

	return (
		<div>
			<h1>Discover</h1>
			<h2>In Your Area</h2>
			<DiscoverDetail events={inYourArea} />
			<div>{/* map In Your Area Results */}</div>
			{/* <h2>Suggested Attractions</h2>
			<DiscoverDetail props={inYourArea} />
			<div></div> */}
			<h2>Dive Into Something New</h2>
			<div>{/* map In Your Area Results */}</div>
			<DiscoverDetail events={misc} />
			<h2>For Music Lovers</h2>
			<div>{/* map In Your Area Results */}</div>
			<DiscoverDetail events={music} />
			<h2>For Cinephiles</h2>
			<div>{/* map In Your Area Results */}</div>
			<DiscoverDetail events={films} />
			<h2>For Sports Fans</h2>
			<DiscoverDetail events={sports} />
			<div>{/* map In Your Area Results */}</div>
		</div>
	);
};

export default Discover;
