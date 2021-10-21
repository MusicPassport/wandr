import {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {AppContext} from './Utility/Context';
import './App.css';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import About from './components/About/About';
// import Timeline from './components/Timeline/Timeline';
import EventDetail from './components/EventDetail/EventDetail';
import Events from './components/Events/Events';
import Create from './components/Create/Create';
import axios from 'axios'

const App = () => {
    // const [events,setEvents] = useState([{}]);
    const [currentUser, setCurrentUser] = useState({
        'name': 'Group 4',
        'events': []
    })

    // const url = `https://intense-island-04626.herokuapp.com/users/1`
    
    // const  getUser = async() => {
    //     try {   
    //         const user = await axios.get(url);
    //         setCurrentUser(user.data)
    //         console.log(user.data)

    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(()=>{
    //     getUser();
    // },[])
    return (
        <div className='App'>
            <Nav/>
            <main>
            <AppContext.Provider >

                <Route exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
                {/* <Route exact path='/timeline' component={Timeline}/> */}
                <Route exact path='/events/:id' component={EventDetail}/>
                <Route exact path='/events' component={Events}/>
                < Route exact path='/create' component={Create}/>
            </AppContext.Provider>
            </main>
        </div>
    );
};

export default App;