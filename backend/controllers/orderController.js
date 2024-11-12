const OrderModel = require("../models/Order");

exports.CreateOrder = async (req, res) => {
    try {
        const { customer, company, items, status, payment, totalAmount, createdBy, leadId } = req.body;

        if (!customer || !company || !items || !status || !payment || !totalAmount || !createdBy || !leadId) {
            return res.status(404).json({ message: "required all fields" });
        }

        const createOrder = new OrderModel({
            customer,
            company,
            items,
            status,
            payment,
            totalAmount,
            createdBy,
            leadId
        });

        await createOrder.save();
        res.status(200).json({ message: "order created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.GetAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
            .populate({
                path: "customer",
                select: "customer"
            })
            .populate({
                path: "company",
                select: "company"
            })
            .populate({
                path: "items.productId",
                select: "name price"
            });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};