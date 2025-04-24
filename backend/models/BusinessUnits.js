const mongoose = require("mongoose");

const BusinessUnitsSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });

const BusinessUnitsModel = mongoose.model("BusinessUnits", BusinessUnitsSchema);
module.exports = BusinessUnitsModel;