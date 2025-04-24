const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: { type: Array, required: true },
    businessUnitId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnits", required: true },
}, { timestamps: true });

const TeamsModel = mongoose.model("Teams", TeamsSchema);
module.exports = TeamsModel;