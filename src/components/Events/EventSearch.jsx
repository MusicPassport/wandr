import { Link, Redirect } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { DataContext } from '../../Utility/Context.jsx';
import './Events.css'
import Select from 'react-select'


const EventSearch = ({ isOpen , setIsOpen }) => {
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

    const stateOptions = [
    { id:'stateCode', label: 'ALABAMA', value: 'AL'},
    { id:'stateCode', label: 'AMERICAN SAMOA', value: 'AS'},
    { id:'stateCode', label: 'ALASKA', value: 'AK'},
    { id:'stateCode', label: 'ARIZONA', value: 'AZ'},
    { id:'stateCode', label: 'ARKANSAS', value: 'AR'},
    { id:'stateCode', label: 'CALIFORNIA', value: 'CA'},
    { id:'stateCode', label: 'COLORADO', value: 'CO'},
    { id:'stateCode', label: 'CONNECTICUT', value: 'CT'},
    { id:'stateCode', label: 'DELAWARE', value: 'DE'},
    { id:'stateCode', label: 'DISTRICT OF COLUMBIA', value: 'DC'},
    { id:'stateCode', label: 'FLORIDA', value: 'FL'},
    { id:'stateCode', label: 'GEORGIA', value: 'GA'},
    { id:'stateCode', label: 'GUAM', value: 'GU'},
    { id:'stateCode', label: 'HAWAII', value: 'HI'},
    { id:'stateCode', label: 'IDAHO', value: 'ID'},
    { id:'stateCode', label: 'ILLINOIS', value: 'IL'},
    { id:'stateCode', label: 'INDIANA', value: 'IN'},
    { id:'stateCode', label: 'IOWA', value: 'IA'},
    { id:'stateCode', label: 'KANSAS', value: 'KS'},
    { id:'stateCode', label: 'KENTUCKY', value: 'KY'},
    { id:'stateCode', label: 'LOUISIANA', value: 'LA'},
    { id:'stateCode', label: 'MAINE', value: 'ME'},
    { id:'stateCode', label: 'MARSHALL ISLANDS', value: 'MH'},
    { id:'stateCode', label: 'MARYLAND', value: 'MD'},
    { id:'stateCode', label: 'MASSACHUSETTS', value: 'MA'},
    { id:'stateCode', label: 'MICHIGAN', value: 'MI'},
    { id:'stateCode', label: 'MINNESOTA', value: 'MN'},
    { id:'stateCode', label: 'MISSISSIPPI', value: 'MS'},
    { id:'stateCode', label: 'MISSOURI', value: 'MO'},
    { id:'stateCode', label: 'MONTANA', value: 'MT'},
    { id:'stateCode', label: 'NEBRASKA', value: 'NE'},
    { id:'stateCode', label: 'NEVADA', value: 'NV'},
    { id:'stateCode', label: 'NEW HAMPSHIRE', value: 'NH'},
    { id:'stateCode', label: 'NEW JERSEY', value: 'NJ'},
    { id:'stateCode', label: 'NEW MEXICO', value: 'NM'},
    { id:'stateCode', label: 'NEW YORK', value: 'NY'},
    { id:'stateCode', label: 'NORTH CAROLINA', value: 'NC'},
    { id:'stateCode', label: 'NORTH DAKOTA', value: 'ND'},
    { id:'stateCode', label: 'NORTHERN MARIANA ISLANDS', value: 'MP'},
    { id:'stateCode', label: 'OHIO', value: 'OH'},
    { id:'stateCode', label: 'OKLAHOMA', value: 'OK'},
    { id:'stateCode', label: 'OREGON', value: 'OR'},
    { id:'stateCode', label: 'PALAU', value: 'PW'},
    { id:'stateCode', label: 'PENNSYLVANIA', value: 'PA'},
    { id:'stateCode', label: 'PUERTO RICO', value: 'PR'},
    { id:'stateCode', label: 'RHODE ISLAND', value: 'RI'},
    { id:'stateCode', label: 'SOUTH CAROLINA', value: 'SC'},
    { id:'stateCode', label: 'SOUTH DAKOTA', value: 'SD'},
    { id:'stateCode', label: 'TENNESSEE', value: 'TN'},
    { id:'stateCode', label: 'TEXAS', value: 'TX'},
    { id:'stateCode', label: 'UTAH', value: 'UT'},
    { id:'stateCode', label: 'VERMONT', value: 'VT'},
    { id:'stateCode', label: 'VIRGIN ISLANDS', value: 'VI'},
    { id:'stateCode', label: 'VIRGINIA', value: 'VA'},
    { id:'stateCode', label: 'WASHINGTON', value: 'WA'},
    { id:'stateCode', label: 'WEST VIRGINIA', value: 'WV'},
    { id:'stateCode', label: 'WISCONSIN', value: 'WI'},
    { id:'stateCode', label: 'WYOMING', value: 'WY' }
    ];
    









// Film/Family
//     const genreOptions =[
//         { id="classificationName", value="All Family Events", label="All Family Events"},
//         { id="classificationName", value="Puppetry", label="Puppetry"},
//         { id="classificationName", value="Ice Shows", label="Ice Shows"},
//         { id="classificationName", value="Magic/Illusion", label="Magic/Illusion"},
//         { id="classificationName", value="Circus/Specialty Acts", label="Circus/Specialty Acts"},
//         { id="classificationName", value="Childrens Theater", label="Children's Theater"},
//         { id="classificationName", value="Rodeo", label="Rodeo"},
//         { id="classificationName", value="Fairs/Festivals", label="Fairs/Festivals"},
//         { id="classificationName", value="Latin Childrens", label="Latin Children's"},
//         { id="classificationName", value="Childrens Music", label="Children's Music"},
//         { id="classificationName", value="Miscellaneous/Family", label="Miscellaneous/Family"},
//         { id="classificationName", value="All Genres", label="All Genres"},
//         { id="classificationName", value="Concerts", label="Concerts"},
//         { id="classificationName", value="Alternative", label="Alternative"},
//         { id="classificationName", value="Ballads/Romantic", label="Ballads/Romantic"},
//         { id="classificationName", value="Blues", label="Blues"},
//         { id="classificationName", value="Chanson Francaise", label="Chanson Francaise"},
//         { id="classificationName", value="Classical", label="Classical"},
//         { id="classificationName", value="Country", label="Country"},
//         { id="classificationName", value="Dance/Electronic", label="Dance/Electronic"},
//         { id="classificationName", value="Folk", label="Folk"},
//         { id="classificationName", value="Hip-Hop/Rap", label="Hip-Hop/Rap"},
//         { id="classificationName", value="Holiday", label="Holiday"},
//         { id="classificationName", value="Jazz", label="Jazz"},
//         { id="classificationName", value="Latin", label="Latin"},
//         { id="classificationName", value="Medieval/Renaissance", label="Medieval/Renaissance"},
//         { id="classificationName", value="Metal", label="Metal"},
//         { id="classificationName", value="New Age", label="New Age"},
//         { id="classificationName", value="Other", label="Other"},
//         { id="classificationName", value="Pop", label="Pop"},
//         { id="classificationName", value="R&B", label="R&B"},
//         { id="classificationName", value="Reggae", label="Reggae"},
//         { id="classificationName", value="Religious", label="Religious"},
//         { id="classificationName", value="Rock", label="Rock"},
//         { id="classificationName", value="World", label="World"},
//         { id="classificationName", value="Aquatics", label="Aquatics"},
//         { id="classificationName", value="Athletic Races", label="Athletic Races"},
//         { id="classificationName", value="Badminton", label="Badminton"},
//         { id="classificationName", value="Bandy", label="Bandy"},
//         { id="classificationName", value="Baseball", label="Baseball"},
//         { id="classificationName", value="Basketball", label="Basketball"},
//         { id="classificationName", value="Biathlon", label="Biathlon"},
//         { id="classificationName", value="Body Building", label="Body Building"},
//         { id="classificationName", value="Boxing", label="Boxing"},
//         { id="classificationName", value="Cricket", label="Cricket"},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
//         { id="classificationName", value="", label=""},
        

//     ]

    const { searchInputs, setSearchInputs } = useContext(DataContext);
    

        function handleChange(event) {
            console.log(event)
            if(event.target){

                setSearchInputs({ ...searchInputs, [event.target.id]: event.target.value });
            } else{
                setSearchInputs({ ...searchInputs, [event.id]: event.value})

            }


    }
    console.log(isOpen)

    function handleSubmit(event) {
        event.preventDefault();
        // setSearchInputs({...searchInputs})
        // setSearchInputs(initialState);
        setIsOpen(!isOpen);
        
    }

    useEffect ( ()=>{
        setSearchInputs(initialState);
        //eslint-disable-next-line
    },[]
    )
    return (
        <div classlabel="searchForm" >  
            <h2>Search Items:</h2>  
            <form  classlabel="searchFields" onSubmit={handleSubmit}>
                <label classlabel="c11" htmlFor="label">Event label</label>
                    <input classlabel="c21"id="keyword" type='text' 
                        placeholder="event label"
                        onChange={handleChange} 
                        value={searchInputs.keyword}/>
                <label classlabel="c12" htmlFor="label">Genre</label>                  
                <select onChange={handleChange} classlabel= "c22" label="Genre" id="classificationName" defaultValue="">
                    <option value="">Select One</option>
                    <option value="familyevents">Family Events</option>
                    <option value="concerts">Concerts</option>
                    <option value="sports">Sports</option>
                    <option value="theater">Theater</option>
                </select>
                <label classlabel="c13">Start Date</label>
                    <input classlabel="c23" id="startDateTime" 
                        type='date' 
                        placeholder="Start Date"
                        onChange={handleChange} 
                        value={searchInputs.startDateTime}/>
                <label classlabel="c14">End Date</label>
                    <input classlabel="c24" id="endDateTime" 
                        type='date'
                        placeholder="End Date " 
                        onChange={handleChange} 
                        value={searchInputs.endDateTime }/>
                <label classlabel="c15">City</label>
                    <input classlabel="c25" id="city" 
                        placeholder="city"
                        type='text' 
                        onChange={handleChange} 
                        value={searchInputs.city }/>
                <label classlabel="c16">State</label>
                <div>
                    <Select id="stateCode" onChange={handleChange} options={stateOptions} default=""/>
                </div>
                {/* <div classlabel="stateScroll">
                    <select classlabel="c26 stateScroll" 
                        id="stateCode" 
                        placeholder="state"
                        type='text' 
                        onChange={handleChange} 
                        // value={searchInputs.stateCode }
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
                    </div>			 */}
            </form>
            <Link to="/events">
                <button classlabel="searchButton" type="submit" onClick={handleSubmit}>Search</button>
            </Link>
        </div>  
    );
};

export default EventSearch;