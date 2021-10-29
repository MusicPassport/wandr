import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { backendAPI } from '../../Utility/Config';
import { DataContext, DashContext } from '../../Utility/Context';
import axios from 'axios';

import '../../css/Memories.css';

const Memories = () => {
	// const { dateRange } = useContext(DashContext);
	const { currentUser, updateUser } = useContext(DataContext);
	const { setDisplaySettings, currentMemory, setCurrentMemory } =
		useContext(DashContext);

	const [memories, setMemories] = useState([]);
	const [events, setEvents] = useState();
	const [addMem, setAddMem] = useState(false);
	const [userInput, setUserInput] = useState({
		title: '',
		body: '',
		photo: '',
		event: '',
	});

	const getEvents = async () => {
		// run a call for all the events and get their title and populate it into state
	};

	useEffect(() => {
		if (currentUser.memories.length) {
			setMemories([...currentUser.memories].reverse());
		}
		if (currentUser.attending.length) setEvents(currentUser.attending);

		getEvents();
	}, []);

	const sortMemories = () => {
		//I want to sort my memories so they're in the same order as the events they're connected to.
	};

	const handleChange = (e) => {
		setUserInput((previousState) => {
			return { ...previousState, [e.target.id]: e.target.value };
		});
	};

	const fileChange = (e) => {
		setUserInput((previousState) => {
			return { ...previousState, photo: e.target.files[0] };
		});
	};


	const toggleMem = () => {
		setAddMem(!addMem);
	};

	const openDetails = async (e) => {
		const getMemory = async (e) => {
			return await memories.find(
				(memory) => memory.id.toString() === e.target.parentElement.id
			);
		};
		const item = await getMemory(e);
		setCurrentMemory((previousState) => {
			return { ...previousState, ...item };
		});
		setDisplaySettings('details');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData();
			data.append('title', userInput.title);
			data.append('body', userInput.body);
			data.append('photo', userInput.photo);
			data.append('event', userInput.event);
			await axios.post(`${backendAPI}/memories/`, data, {
				'Content-Type': 'multipart/form-data',
				headers: {
					Authorization: `Token ${localStorage.getItem('auth')}`,
				},
			});
			setAddMem(!addMem);
			updateUser();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='memory-page'>
			<div className='memory-options'>
				<h1>{memories.length ? 'Hello from memories' : 'No memories yet'}</h1>
				<button onClick={toggleMem}>Add a memory</button>
			</div>
			{addMem && (
				<form className='add-memory-form' onSubmit={handleSubmit}>
					<input
						id='title'
						placeholder='Memory title'
						type='text'
						name='title'
						value={userInput.title}
						onChange={handleChange}
					/>
					<textarea
						placeholder='Describe this memory.'
						id='body'
						name='body'
						rows='10'
						value={userInput.body}
						onChange={handleChange}
					/>
					<select
						id='event'
						name='event'
						defaultValue={null}
						value={userInput.event}
						onChange={handleChange}>
						return (
						<>
							<option name={null} selected value={null}>
								Choose an event.
							</option>
							{events.map((event) => {
								return (
									<option name='event' value={event.id}>
										{event.name}
									</option>
								);
							})}
						</>
						)
					</select>
					<input
						type='file'
						id='photo'
						name='photo'
						placeholder='choose image'
						onChange={fileChange}
					/>
					<div className='memory-buttons'>
						<button onClick={toggleMem}>Cancel</button>
						<button type='submit'>Submit</button>
					</div>
				</form>
			)}
			{memories &&
				memories.reverse().map((memory) => {
					return (
						<div
							className='memory'
							key={memory.id}
							id={memory.id}
							className='memory-container'>
							<h2 className='memory-title' onClick={openDetails}>
								{memory.title}
							</h2>
							<div className='photo-container'>
								<img
									onClick={openDetails}
									src={memory.photo}
									className='memory-pic'
									alt='alt'
								/>
							</div>

							<p onClick={openDetails}>{memory.body}</p>
						</div>
					);
				})}
		</div>
	);
};

export default Memories;
