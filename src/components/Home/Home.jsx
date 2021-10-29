import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/Home.css';

const Home = () => {
    return (
        <>
            <h1 className="headline" >Wandr</h1>
            <Link className="home-link" to="/events">Explore</Link>  
        </>
    );
};

export default Home;