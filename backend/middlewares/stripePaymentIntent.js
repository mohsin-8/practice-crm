const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const InvoiceModel = require("../models/Invoice");
const TransactionModel = require("../models/Transaction");

exports.createPaymentIntent = async (req, res) => {
    try {
        const { invoiceId } = req.body;

        const invoice = await InvoiceModel.findById(invoiceId);
        if (!invoice) return res.status(404).json({ error: "Invoice not found" });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(invoice.totalAmount * 100),
            currency: "usd",
            metadata: { invoiceId: invoice._id.toString() }
        });

        const transaction = new TransactionModel({
            invoiceId: invoice._id,
            amount: invoice.totalAmount,
            currency: "usd",
            stripePaymentIntentId: paymentIntent.id,
            status: "Pending"
        });
        await transaction.save();

        invoice.stripePaymentIntentId = paymentIntent.id;
        await invoice.save();

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};