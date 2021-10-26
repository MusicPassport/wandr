import React from 'react'
import { Link } from 'react-router-dom'


const Nav = () => {
    return (
        <header>
            <Link to='/'>Home</Link>
            {/* <Link to='/calendar'>Calendar</Link> */}
            {/* <Link to='/timeline'>Timeline</Link> */}
            {/* <Link to='/map'>Map</Link> */}
            <Link to='/about'>About</Link>
            <Link to='/events'>Events</Link>
        </header>
    )
}
export default Nav;
