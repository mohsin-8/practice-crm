const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.ObjectId,
        ref: "Leads",
        required: true
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
        type: String,
        enum: ['completed', 'pending', 'failed'],
        required: true
    },
    payment_method: { type: String, required: true },
    stripe_payment_id: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const TransactionsModel = mongoose.model("Transactions", TransactionSchema);

module.exports = TransactionsModel;