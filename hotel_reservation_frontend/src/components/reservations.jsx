// src/components/Reservations.jsx
import React, { useEffect, useState } from 'react';
import { fetchReservations, deleteReservation } from '../api';
import Navbar from './Navbar';  // Add Navbar for easy navigation

const Reservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations()
            .then(setReservations)
            .catch((error) => console.error(error));
    }, []);

    const handleDeleteReservation = async (id) => {
        try {
            await deleteReservation(id);
            setReservations(reservations.filter((reservation) => reservation.id !== id));
        } catch (error) {
            console.error('Failed to delete reservation:', error);
        }
    };

    return (
        <div>
            <Navbar /> {/* Add Navbar */}
            <h1>Reservations</h1>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Room Number</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.customer_name}</td>
                            <td>{reservation.room_number}</td>
                            <td>{reservation.check_in}</td>
                            <td>{reservation.check_out}</td>
                            <td>
                                <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservations;
