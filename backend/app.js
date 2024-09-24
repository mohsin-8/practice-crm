require("dotenv").config();
const express = require("express");
const DatabaseConnection = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// database connection
DatabaseConnection();
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));