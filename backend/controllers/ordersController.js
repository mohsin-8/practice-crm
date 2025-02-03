const OrderModel = require("../models/Orders");

exports.CreateOrder = async (req, res) => {
    try {
        const { leadId, productName, price, discountAmount, subtotalAmount, totalAmount, status } = req.body;

        const orders = new OrderModel({
            leadId, productName, price, discountAmount, subtotalAmount, totalAmount, status
        });

        await orders.save();
        res.status(200).json({ message: "Order created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};