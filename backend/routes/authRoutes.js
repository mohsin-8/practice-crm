const express = require("express");
const { register, login, refreshToken, resetPassword, requestResetPassword, logout } = require("../controllers/authController");
const { protect, authorize, authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

// public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post('/reset-password/:token', resetPassword);
router.post('/request-reset-password', requestResetPassword);
router.post("/logout", authenticate, logout);

// Protected routes (for testing purposes)
router.get("/dashboard", protect, (req, res) => {
    res.send(`Welcome ${req.user.name}, Role: ${req.user.role}`);
});

// Admin-only route
router.get("/admin", protect, authorize("admin"), (req, res) => {
    res.send("Admin Access");
});

module.exports = router;