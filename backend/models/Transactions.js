const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", required: true },
    amountPaid: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "Bank Transfer", "Stripe"], required: true },
    transactionId: { type: String, required: true, unique: true },
    stripeChargeId: { type: String },
    status: { type: String, enum: ["Success", "Failed", "Pending"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const TransactionModel = mongoose.model("Transactions", TransactionSchema);
module.exports = TransactionModel;