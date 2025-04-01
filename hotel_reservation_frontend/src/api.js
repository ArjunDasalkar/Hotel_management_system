export const apiUrl = "http://localhost:5000";

// Helper function to get the token
function getToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }
    return token;
}

// Fetch Customers function
export async function fetchCustomers() {
    const response = await fetch(`${apiUrl}/customers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch customers: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}

// Add Customer function
export async function addCustomer(customer) {
    const response = await fetch(`${apiUrl}/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to add customer: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}

// Delete Customer function
export async function deleteCustomer(id) {
    const response = await fetch(`${apiUrl}/customers/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to delete customer: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}

// Fetch Rooms function
export async function fetchRooms() {
    const response = await fetch(`${apiUrl}/rooms`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch rooms: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}

// Add Room function
export async function addRoom(room) {
    const response = await fetch(`${apiUrl}/rooms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify(room),
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to add room: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}

// Delete Room function
export async function deleteRoom(id) {
    const response = await fetch(`${apiUrl}/rooms/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to delete room: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}

// Fetch Reservations function
export async function fetchReservations() {
    const response = await fetch(`${apiUrl}/reservations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch reservations: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}

// Add Reservation function (also updates room status)
export async function addReservation(reservation) {
    const response = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify(reservation),
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to add reservation: ${errorDetails.error || "Unknown error"}`);
    }

    const newReservation = await response.json();

    // Update the room status to "booked"
    try {
        await updateRoomStatus(reservation.room_id, "booked");
    } catch (error) {
        console.error("Failed to update room status:", error);
    }

    return newReservation;
}

// Delete Reservation function
export async function deleteReservation(id) {
    const response = await fetch(`${apiUrl}/reservations/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to delete reservation: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}

// Update Room Status function
export async function updateRoomStatus(roomId, status) {
    const response = await fetch(`${apiUrl}/rooms/${roomId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to update room status: ${errorDetails.error || "Unknown error"}`);
    }

    return await response.json();
}
