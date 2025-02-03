const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    leadId: { type: mongoose.Schema.ObjectId, ref: "Leads", required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    discountAmount: { type: Number, required: true },
    subtotalAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Paid", "Unpaid", "Pending", "Cancelled"], default: "Unpaid" },
    saleType: { type: String, enum: ["CROSS_SALE", "UPSELL", "SALE"], default: "UPSELL" },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;