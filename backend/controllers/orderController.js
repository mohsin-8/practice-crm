const OrderModel = require("../models/Order");
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.CreateOrder = async (req, res) => {
    try {
        const { customer, company, items, status, payment, totalAmount, createdBy, leadId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: 'usd',
            payment_method: payment.transactionId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        });

        const createOrder = new OrderModel({
            customer,
            company,
            items,
            status,
            payment: {
                ...payment,
                status: paymentIntent.status === 'succeeded' ? 'Paid' : 'Unpaid',
                transactionId: paymentIntent.id,
            },
            totalAmount,
            createdBy,
            leadId,
        });

        await createOrder.save();
        res.status(200).json({ message: "Order created successfully" });
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