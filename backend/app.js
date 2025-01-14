require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DatabaseConnection = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectsRoutes = require("./routes/projectRoutes");
const tagsRoutes = require("./routes/tagsRoutes");
const productRoutes = require("./routes/productRoutes");
const leadsRoutes = require("./routes/leadsRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// database connection
DatabaseConnection();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/project", projectsRoutes);
app.use("/", tagsRoutes);
app.use("/", productRoutes);
app.use("/", leadsRoutes);
app.use("/", orderRoutes);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));