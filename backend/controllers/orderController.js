const OrderModel = require("../models/Order");

exports.CreateOrder = async (req, res) => {
    try {
        const { customer, company, items, status, payment, orderDate, deliveryDate, totalAmount, createdBy, leadId } = req.body;

        const order = new OrderModel({
            customer,
            company,
            items,
            status,
            payment,
            orderDate,
            deliveryDate,
            totalAmount,
            createdBy,
            leadId
        });

        await order.save();
        res.status(200).json({ message: "order created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.GetAllOrder = async (req, res) => {
    try {
        const order = await OrderModel.find({});

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};