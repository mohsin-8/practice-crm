require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DatabaseConnection = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// database connection
DatabaseConnection();
app.use(express.json());
app.use(cors({
    origin: 'https://practice-crm-beige.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use("/auth", authRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));