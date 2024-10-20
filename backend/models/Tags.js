const mongoose = require("mongoose");

const Tags = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Tags", Tags);