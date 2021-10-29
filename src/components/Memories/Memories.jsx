import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { backendAPI} from '../../Utility/Config';
import {DataContext, DashContext} from '../../Utility/Context';
import axios from 'axios';

import '../../css/Memories.css';

const Memories = ( { setCurrentMemory } ) => {
    const {currentUser} = useContext(DataContext);
	const history = useHistory();

    const [memories, setMemories] = useState([]);
    const [events, setEvents] = useState();
    const [addMem, setAddMem] = useState(false);
    const [userInput, setUserInput] = useState({
        title: "",
        body: "",
        photo: "",
        event: ""
    });

    useEffect( () => {
        if(currentUser.memories.length) setMemories([...currentUser.memories].reverse());
        if(currentUser.attending.length) setEvents(currentUser.attending);
    }, []);

    const sortMemories = () => {
        //I want to sort my memories so they're in the same order as the events they're connected to.
    }

    const handleChange = (e) => {
             setUserInput((previousState) => {
                 return {...previousState, [e.target.id]: e.target.value};
    })}

    const fileChange = (e) => {
        setUserInput((previousState) => {
            return {...previousState, photo: e.target.files[0]};
    })} 

    const toggleMem = () => {
        setAddMem(!addMem);
    }
    
    const openDetails = async (e) => {
        const getMemory = async (e) => {
            return await memories.find(memory => memory.id.toString() === e.target.parentElement.id)
        }
        const item = await getMemory(e);
       setCurrentMemory((previousState) => {
            return {...previousState, ...item}
        });
        history.push(`/dashboard/memories/${e.target.parentElement.id}`)
        // setDisplaySettings('details');
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const data = new FormData();
           data.append('title', userInput.title);
           data.append('body', userInput.body);
           data.append('photo', userInput.photo);
           data.append('event', userInput.event);
               await axios.post(`${backendAPI}/memories/`, 
                data ,
                { 
                    'Content-Type': 'multipart/form-data',
                headers: { 
                    Authorization: `Token ${localStorage.getItem('auth')}`
                    }
                })
                setAddMem(!addMem);
        } catch(err) {
            console.log(err);
        }
    }

return (
	<div>
		<button onClick={() => history.goBack()}>←</button>
		<div className='section-title'>
			<h1>{memories.length ? 'Your Memories' : 'No memories yet'}</h1>
			<button className='btn add-memory' onClick={toggleMem}>
				Add Memory
			</button>
		</div>
		{addMem && (
			<form onSubmit={handleSubmit}>
				<input
					id='title'
					type='text'
					name='title'
					value={userInput.title}
					onChange={handleChange}
				/>
				<textarea
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
				<button type='submit'>Submit</button>
				<button onClick={toggleMem}>Cancel</button>
			</form>
		)}
		<div className='memories'>
			{memories &&
				memories.map((memory) => {
					return (
						<div className='memory' key={memory.id} id={memory.id}>
							<div className='img-container'>
								<img
									className='img'
									onClick={openDetails}
									src={memory.photo}
									alt='alt'
								/>
							</div>
							<div className='memory-info'>
								<div className='memory-title'>
									<h2 onClick={openDetails}>{memory.title}</h2>
								</div>
								<p onClick={openDetails}>{memory.body}</p>
							</div>
						</div>
					);
				})}
		</div>
	</div>
);
}

export default Memories
