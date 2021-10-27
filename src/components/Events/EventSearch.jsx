import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Events.css'

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
                        type='date' 
                        placeholder="Start Date"
                        onChange={handleChange} 
                        value={formstate.startDateTime}/>
                <label className="c14">End Date</label>
                    <input className="c24" id="endDateTime" 
                        type='date'
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
                <div className="stateScroll">
                    <select className="c26 stateScroll" 
                        id="stateCode" 
                        placeholder="state"
                        type='text' 
                        onChange={handleChange} 
                        maxMenuHeight={100}
                        // value={formstate.stateCode }
                        >
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>			
            </form>
            <Link to="/search/events">
                <button className="searchButton" type="submit" onSubmit={handleSubmit}>Search</button>
            </Link>
        </div>  
    );
};

export default EventSearch;