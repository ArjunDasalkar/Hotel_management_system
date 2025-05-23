// src/components/BookReservation.jsx 
import React, { useState, useEffect } from "react";
import { fetchCustomers, fetchRooms, addReservation } from "../api";
import Navbar from "./Navbar"; // Import Navbar
import './BookReservation.css';

const BookReservation = () => {
    const [customers, setCustomers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [newReservation, setNewReservation] = useState({
        customer_id: "",
        room_id: "",
        check_in: "",
        check_out: "",
    });

    useEffect(() => {
        fetchCustomers()
            .then(setCustomers)
            .catch((error) => console.error("Error fetching customers:", error));

        fetchRooms()
            .then((data) => {
                const availableRooms = data.filter(room => room.status === "available");
                setRooms(availableRooms);
            })
            .catch((error) => console.error("Error fetching rooms:", error));
    }, []);

    const handleReservation = async (e) => {
        e.preventDefault();

        if (!newReservation.customer_id || !newReservation.room_id || !newReservation.check_in || !newReservation.check_out) {
            alert("Please fill all fields.");
            return;
        }

        try {
            await addReservation(newReservation);
            alert("Reservation added successfully!");
            setNewReservation({ customer_id: "", room_id: "", check_in: "", check_out: "" });
        } catch (error) {
            console.error("Failed to book reservation:", error);
        }
    };

    return (
        <div>
            <Navbar /> {/* Navbar added here */}
            <h1>Book Reservation</h1>
            <form onSubmit={handleReservation}>
                <label>Select Customer</label>
                <select
                    value={newReservation.customer_id}
                    onChange={(e) => setNewReservation({ ...newReservation, customer_id: e.target.value })}
                    required
                >
                    <option value="">-- Choose a Customer --</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name} ({customer.email})
                        </option>
                    ))}
                </select>

                <label>Select Room</label>
                <select
                    value={newReservation.room_id}
                    onChange={(e) => setNewReservation({ ...newReservation, room_id: e.target.value })}
                    required
                >
                    <option value="">-- Choose a Room --</option>
                    {rooms.map(room => (
                        <option key={room.id} value={room.id}>
                            Room {room.room_number} - {room.type} (₹{room.price})
                        </option>
                    ))}
                </select>

                <label>Check-in Date</label>
                <input
                    type="date"
                    value={newReservation.check_in}
                    onChange={(e) => setNewReservation({ ...newReservation, check_in: e.target.value })}
                    required
                />
                {/* <p>Check-in is the date when you will start your stay at the hotel.</p> */}

                <label>Check-out Date</label>
                <input
                    type="date"
                    value={newReservation.check_out}
                    onChange={(e) => setNewReservation({ ...newReservation, check_out: e.target.value })}
                    required
                />
                {/* <p>Check-out is the date when you will leave the hotel.</p> */}

                <button type="submit">Book Reservation</button>
            </form>
        </div>
    );
};

export default BookReservation;
