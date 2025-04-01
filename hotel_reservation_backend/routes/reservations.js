const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

// ✅ Fetch reservations with customer names and room numbers
router.get("/", verifyToken, (req, res) => {
    const { sort_by = "id", order = "ASC" } = req.query;

    // Allowed columns for sorting
    const validSortColumns = ["id", "customer_name", "room_number", "check_in", "check_out"];
    const validOrder = ["ASC", "DESC"];

    // Validate input
    if (!validSortColumns.includes(sort_by) || !validOrder.includes(order.toUpperCase())) {
        return res.status(400).json({ error: "Invalid sort column or order" });
    }

    // ✅ JOIN Customers and Rooms to get actual names
    const query = `
        SELECT 
            Reservations.id,
            Customers.name AS customer_name,
            Rooms.room_number,
            Reservations.check_in,
            Reservations.check_out
        FROM Reservations
        JOIN Customers ON Reservations.customer_id = Customers.id
        JOIN Rooms ON Reservations.room_id = Rooms.id
        ORDER BY ${sort_by} ${order.toUpperCase()}
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});




// ✅ Add a reservation
router.post("/", verifyToken, (req, res) => {
    const { customer_id, room_id, check_in, check_out } = req.body;

    const query = "INSERT INTO Reservations (customer_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?)";
    
    db.query(query, [customer_id, room_id, check_in, check_out], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reservation successful!", id: result.insertId });
    });
});

// ✅ Update a reservation
router.put("/:id", verifyToken, (req, res) => {
    const { customer_id, room_id, check_in, check_out } = req.body;
    const query = "UPDATE Reservations SET customer_id = ?, room_id = ?, check_in = ?, check_out = ? WHERE id = ?";

    db.query(query, [customer_id, room_id, check_in, check_out, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reservation updated successfully!" });
    });
});

// ✅ Delete a reservation
router.delete("/:id", verifyToken, (req, res) => {
    db.query("DELETE FROM Reservations WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reservation deleted successfully!" });
    });
});

module.exports = router;
