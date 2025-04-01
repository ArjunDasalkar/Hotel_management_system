// src/components/Customers.jsx
import React, { useEffect, useState } from "react";
import { fetchCustomers, addCustomer, deleteCustomer } from "../api";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        aadhaar: "", // Added aadhaar field
    });

    useEffect(() => {
        fetchCustomers()
            .then((data) => setCustomers(data))
            .catch((error) => console.error("Error fetching customers:", error.message));
    }, []);

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        try {
            const newCustomerData = await addCustomer(newCustomer);
    
            // Optionally, fetch the updated list of customers from the backend
            const updatedCustomers = await fetchCustomers();
    
            // Update state with the latest customer list
            setCustomers(updatedCustomers);
    
            // Reset form fields
            setNewCustomer({ name: '', email: '', phone: '', aadhaar: '' });
        } catch (error) {
            console.error('Failed to add customer:', error);
        }
    };
    
    
    

    const handleDeleteCustomer = async (id) => {
        try {
            await deleteCustomer(id);
            setCustomers(customers.filter((customer) => customer.id !== id));
        } catch (error) {
            console.error("Failed to delete customer:", error.message);
        }
    };

    return (
        <div>
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Aadhaar</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.aadhaar}</td>
                            <td>
                                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New Customer</h2>
            <form onSubmit={handleAddCustomer}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Aadhaar"
                    value={newCustomer.aadhaar}
                    onChange={(e) => setNewCustomer({ ...newCustomer, aadhaar: e.target.value })}
                    required
                />
                <button type="submit">Add Customer</button>
            </form>
        </div>
    );
};

export default Customers;
