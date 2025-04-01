const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        // Check if token starts with 'Bearer ' and extract token
        const tokenWithoutBearer = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.admin = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;
