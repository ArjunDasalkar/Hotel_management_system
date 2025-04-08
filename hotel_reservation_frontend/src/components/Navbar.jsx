import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Ensure you have a CSS file for styling

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header>
            <h1 className="site-title">Hotel Reservation System</h1>
            <nav>
                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/customers">Customers</Link>
                    <Link to="/rooms">Rooms</Link>
                    <Link to="/reservations">Reservations</Link>
                    <Link to="/book-reservation">Book Reservation</Link>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
};

export default Navbar;
