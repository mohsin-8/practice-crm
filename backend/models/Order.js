const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leads',
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leads',
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true,
            },
            price: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                min: 0,
            }
        },
    ],
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    payment: {
        method: {
            type: String,
            enum: ['Credit Card', 'Bank Transfer'],
            required: true,
        },
        status: {
            type: String,
            enum: ['Unpaid', 'Paid', 'Refunded'],
            default: 'Unpaid',
        },
        transactionId: {
            type: String,
        },
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    createdBy: {
        type: String,
        required: true
    },
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leads',
        required: true,
    }
}, { timestamps: true, });

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;