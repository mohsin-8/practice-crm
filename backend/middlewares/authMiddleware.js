// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify token and role
exports.protect = async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from decoded token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware for role-based access control (RBAC)
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
};


exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assumes Bearer token format

    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to the request
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};