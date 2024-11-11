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
                type: Number,
                required: true,
                min: 0,
            }
        },
    ],
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    payment: {
        method: {
            type: String,
            enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'],
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
    deliveryDate: {
        type: Date,
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