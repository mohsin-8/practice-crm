const mongoose = require("mongoose");

const DatabaseConnection = () => {
    const DBURi = process.env.MONGODB;
    mongoose.connect(DBURi);
    mongoose.connection.on("connected", () => console.log("database is connected"));
    mongoose.connection.on("error", (error) => console.log(error));
};

module.exports = DatabaseConnection;