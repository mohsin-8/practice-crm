const mongoose = require("mongoose");

const LeadsSchema = new mongoose.Schema({
    customer: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    company: { type: String, required: true },
    lead_source: { type: String, enum: ["Website", "Bark", "Google", "Bing", "Facebook", "Thumbtack", "Other"], required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const LeadsModel = mongoose.model("Leads", LeadsSchema);

module.exports = LeadsModel;