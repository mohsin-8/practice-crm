const OrderModel = require("../models/Order");

exports.CreateOrder = async (req, res) => {
    try {
        const { customer, items, status, payment, orderDate, deliveryDate, totalAmount } = req.body;

        const order = new OrderModel({
            customer,
            items,
            status,
            payment,
            orderDate,
            deliveryDate,
            totalAmount
        });

        await order.save();
        res.status(200).json({ message: "order created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};