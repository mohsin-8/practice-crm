const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    credit: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true },
    toBePaid: { type: Number, required: true },
    balance: { type: Number, required: true },
    merchant: { type: String, required: true },
    currency: { type: String, required: true },
    dueDate: { type: String, required: true },
    companyName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leads',
        required: true,
    },
    customerName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String,
        required: false,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
});

const invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = invoice;