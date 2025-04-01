// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Rooms from './components/rooms';
import Reservations from './components/reservations';
import Navbar from './components/Navbar'; // Import Navbar
import BookReservation from './components/BookReservation';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route - Login */}
                <Route path="/" element={<Login />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Navbar />  {/* Add Navbar */}
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customers"
                    element={
                        <PrivateRoute>
                            <Navbar />  {/* Add Navbar */}
                            <Customers />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/rooms"
                    element={
                        <PrivateRoute>
                            <Navbar />  {/* Add Navbar */}
                            <Rooms />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/reservations"
                    element={
                        <PrivateRoute>
                            <Navbar />  {/* Add Navbar */}
                            <Reservations />
                        </PrivateRoute>
                    }
                />
                <Route path="/book-reservation" element={<BookReservation />} />
            </Routes>
        </Router>
    );
};

export default App;
