// src/components/Rooms.jsx
import React, { useEffect, useState } from 'react';
import { fetchRooms, addRoom, deleteRoom } from '../api';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({
        room_number: '',
        type: '',
        price: '',
        status: 'available'  // Default status
    });

    useEffect(() => {
        fetchRooms()
            .then((data) => setRooms(data))
            .catch((error) => console.error(error));
    }, []);

    const handleAddRoom = async (e) => {
        e.preventDefault();
        
        // Log the newRoom state to make sure it contains the correct data
        console.log(newRoom);
    
        // Validate if all fields are filled
        if (!newRoom.room_number || !newRoom.type || !newRoom.price || !newRoom.status) {
            alert("Please fill all fields.");
            return;
        }
    
        try {
            await addRoom(newRoom);
            
            // Fetch the updated list of rooms from the backend
            const updatedRooms = await fetchRooms();
            setRooms(updatedRooms);
    
            // Reset form fields
            setNewRoom({ room_number: '', type: '', price: '', status: 'available' });
        } catch (error) {
            console.error('Failed to add room:', error);
        }
    };
    
    const handleDeleteRoom = async (id) => {
        try {
            await deleteRoom(id);
            setRooms(rooms.filter((room) => room.id !== id));
        } catch (error) {
            console.error('Failed to delete room:', error);
        }
    };

    return (
        <div>
            <h1>Rooms</h1>
            <table>
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.room_number}</td>
                            <td>{room.type}</td>
                            <td>{room.price}</td>
                            <td>{room.status}</td>
                            <td>
                                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New Room</h2>
            <form onSubmit={handleAddRoom}>
                <input
                    type="text"
                    placeholder="Room Number"
                    value={newRoom.room_number}
                    onChange={(e) => setNewRoom({ ...newRoom, room_number: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Type"
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newRoom.price}
                    onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                    required
                />
                <select
                    value={newRoom.status}
                    onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                    required
                >
                    <option value="Available" >Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Out of Service">Out of Service</option>
                </select>
                <button type="submit">Add Room</button>
            </form>
        </div>
    );
};

export default Rooms;