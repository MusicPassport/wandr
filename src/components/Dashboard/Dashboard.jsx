import { useState } from 'react';
import '../../css/Dashboard.css';
import DashNav from './DashNav'; 
import Timeline from '../Timeline/Timeline';
import Calendar from '../Calendar/Calendar';

const Dashboard = ( { dateRange, setDateRange }) => {

    return (
        <>
        <div className="dashboard">
            <section className="dashboard-header">
                <DashNav />
            </section>

            <Calendar className="calendar" dateRange={dateRange} setDateRange={setDateRange} />
               
            <div className="timeline-box">  
                <Timeline className="timeline" dateRange={dateRange} />
            </div>            
        </div>
        </>
           
    )
};

export default Dashboard;