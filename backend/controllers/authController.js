const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const transporter = require('../config/nodemailerConfig');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
};

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await UserModel.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new UserModel({
            name,
            email,
            password,
            role
        });

        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log(user, "is user login")
        const isMatch = await user.comparePassword(password);
        console.log(isMatch, "is Match login");

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password1' });
        }
        console.log('Password Match login:', isMatch);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken();

        // Save the refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(403).json({ message: "Refresh token required" });

    try {
        const user = await UserModel.findOne({ refreshToken: token });
        if (!user) return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = generateAccessToken(user);

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const resetToken = req.params.token;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'New password is required' });
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    try {
        const user = await UserModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the password
        user.password = password; // Or hash it here if not hashed in the pre-save hook
        user.resetPasswordToken = undefined; // Clear reset token
        user.resetPasswordExpire = undefined; // Clear expiration
        await user.save(); // Save the updated user
        console.log(user, "user reset")
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.requestResetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }

        // Generate password reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash the token and set it along with the expiration time on the user
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

        // Save the user with the new reset token data
        await user.save();

        // Create the reset URL
        // const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
        const resetUrl = `${process.env.LOCAL_FRONTEND_URL}/reset-password/${resetToken}`;

        // Send the reset email
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email (from .env file)
            to: email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) have requested to reset the password for your account. Click the link to reset your password: ${resetUrl}`,
            html: `<p>You are receiving this email because you (or someone else) requested a password reset.</p><p>Click <a href="${resetUrl}">here</a> to reset your password.</p><p>The link will expire in 10 minutes.</p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Reset token sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};