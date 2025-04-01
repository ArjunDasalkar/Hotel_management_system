// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/reservations">Reservations</Link>
            <Link to="/book-reservation">Book Reservation</Link> {/* New Page */}
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
