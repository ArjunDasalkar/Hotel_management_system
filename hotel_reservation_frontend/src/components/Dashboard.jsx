import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar component
import "./Dashboard.css"; // Import CSS file

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="overlay"></div> 
            <h1 className="dashboard-heading">Welcome to Admin Dashboard</h1>
            {/* <p className="dashboard-subtext">Manage your content efficiently and effortlessly</p> */}
        </div>
    );
};

export default Dashboard;
