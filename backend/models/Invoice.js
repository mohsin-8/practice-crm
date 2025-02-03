const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Leads", required: true },
    items: [{
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Paid", "Overdue"], default: "Pending" },
    dueDate: { type: Date, required: true },
    stripePaymentIntentId: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const InvoiceModel = mongoose.model("Invoices", InvoiceSchema);
module.exports = InvoiceModel;