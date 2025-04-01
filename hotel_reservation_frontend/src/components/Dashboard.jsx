// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';  // Import the Navbar

const Dashboard = () => {
    return (
        <div>
            <Navbar />  {/* Add Navbar here */}
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/customers">View Customers</Link></li>
                    <li><Link to="/rooms">View Rooms</Link></li>
                    <li><Link to="/reservations">View Reservations</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
