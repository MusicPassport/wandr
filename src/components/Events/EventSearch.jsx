import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const EventSearch = () => {
    const initialState={
            keyword:'',
            postalCode:'',
            venueId:'',
            city:'',
            stateCode:'',
            startDateTime:'',
            endDateTime:'',
            classificationName:'',
        }
    const [formstate, setFormstate] = useState(initialState)

        function handleChange(event) {
        setFormstate({ ...formstate, [event.target.id]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setFormstate(initialState);
    }

    useEffect ( ()=>{
        setFormstate(initialState);
        //eslint-disable-next-line
    },[]
    )
    return (
        <div className="searchForm" >  
            <h2>Search Items:</h2>  
            <form  className="searchFields" onSubmit={handleSubmit}>
                <label className="c11" htmlFor="name">Event Name</label>
                    <input className="c21"id="keyword" type='text' 
                        placeholder="event name"
                        onChange={handleChange} 
                        value={formstate.keyword }/>
                <label className="c12" htmlFor="name">Genre</label>                  
                <select onChange={handleChange} className= "c22" name="Genre" id="classificationName" defaultValue="">
                    <option value="">Select One</option>
                    <option value="familyevents">Family Events</option>
                    <option value="concerts">Concerts</option>
                    <option value="sports">Sports</option>
                    <option value="theater">Theater</option>
                </select>
    
                <label className="c13">Start Date</label>
                    <input className="c23" id="startDateTime" 
                        type='text' 
                        placeholder="Start Date"
                        onChange={handleChange} 
                        value={formstate.startDateTime}/>
                <label className="c14">End Date</label>
                    <input className="c24" id="endDateTime" 
                        type='text'
                        placeholder="End Date " 
                        onChange={handleChange} 
                        value={formstate.endDateTime }/>
                <label className="c15">City</label>
                    <input className="c25" id="city" 
                        placeholder="city"
                        type='text' 
                        onChange={handleChange} 
                        value={formstate.city }/>
                <label className="c16">State</label>
                    <input className="c26" id="stateCode" 
                        placeholder="state"
                        type='text' 
                        onChange={handleChange} 
                        value={formstate.stateCode }/>
            </form>
            <Link to="/search/events">
                <button className="searchButton" type="submit" onSubmit={handleSubmit}>Search</button>
            </Link>
        </div>  
    );
};

export default EventSearch;