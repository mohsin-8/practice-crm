const express = require("express");
const { register, login, refreshToken, resetPassword, requestResetPassword, getLoggedInUser, getLoggedInUserUpdate } = require("../controllers/authController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post('/reset-password/:token', resetPassword);
router.post('/request-reset-password', requestResetPassword);
router.get('/me', protect, getLoggedInUser);

// Protected routes (for testing purposes)
router.get("/dashboard", protect, (req, res) => {
    res.send(`Welcome ${req.user.name}, Role: ${req.user.role}`);
});

// Admin-only route
router.get("/admin", protect, authorize("admin"), (req, res) => {
    res.send("Admin Access");
});

module.exports = router;