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
const invoiceRoutes = require("./routes/invoiceRoutes");
const transactionsRoute = require("./routes/transactionsRoute");
const paymentRoutes = require("./routes/paymentRoutes");

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
app.use("/", invoiceRoutes);
app.use("/", transactionsRoute);
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));