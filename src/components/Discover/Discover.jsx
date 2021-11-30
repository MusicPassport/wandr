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
	const [locationEnabled, setLocationEnabled] = useState(false);
	// const []
     
	useEffect(() => {
		getInYourArea();
        getSports();
        getMusic();
        getFilm();
        // getMisc();
	}, []);

	const getInYourArea =async () => {	
		let latLong = '';
		navigator.geolocation.getCurrentPosition(async (position) => {
			const lat = position.coords.latitude ? position.coords.latitude : "" ;
			const long = position.coords.longitude ? position.coords.longitude: "";
			const latLong = position.coords.latitude? `&latlong=${lat},${long}`:"";
			if (lat) setLocationEnabled(true);

				let res = await axios.get(
					`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_API_KEY}&radius=100&locale=*&startDateTime=2021-10-28T21:42:00Z&endDateTime=2021-11-28T21:43:00Z${latLong}&segmentName=music`
				);
				setInYourArea([...res.data['_embedded'].events]);

	   	});}


	const getSuggest = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/suggest?apikey=${process.env.REACT_APP_API_KEY}`
		);
	};

	const getSports = async () => {
		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&random=true&apikey=${process.env.REACT_APP_API_KEY}`
		);
        setSports(res.data['_embedded'].events);
	};

	const getMusic = async () => {

		let res = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events.json?&segmentName=music&random=true&apikey=${process.env.REACT_APP_API_KEY}`
		);
        setMusic(res.data['_embedded'].events);
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
			
		);

        setFilms(res.data['_embedded'].events);
	};

	return (
		<div>
			<div className='discover-landing'>
				<h2 className='landing-title'>Discover Something New</h2>		
			</div>
			<div className='main-div'>
				{(locationEnabled) ? <>
					<h2 className='discover-section-title'>In Your Area</h2>
				<DiscoverDetail events={inYourArea} />
				</> : null}
				<h2 className='discover-section-title'>For Cinephiles</h2>
				<DiscoverDetail events={films} />
				<h2 className='discover-section-title'>For Music Lovers</h2>
				<DiscoverDetail events={music} />
				<h2 className='discover-section-title'>For Sports Fans</h2>
				<DiscoverDetail events={sports} />
				<h2 className='discover-section-title'>Dive Into Something New</h2>
				<DiscoverDetail events={misc} />
			</div>
		</div>
	);
};

export default Discover;
