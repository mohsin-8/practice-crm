const mongoose = require("mongoose");
require("./Invoice");

const TransactionSchema = new mongoose.Schema({
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", required: true },
    amountPaid: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
    chargebackStatus: { type: String, enum: ["None", "Disputed", "Won", "Lost"], default: "None" },
    paymentMethod: { type: String, enum: ["Stripe", "Bank Transfer"], required: true },
    stripePaymentIntentId: { type: String },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const TransactionModel = mongoose.model("Transactions", TransactionSchema);
module.exports = TransactionModel;