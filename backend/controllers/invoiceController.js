const InvoiceModel = require("../models/Invoice");
const LeadsModel = require("../models/Leads");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.InvoiceCreate = async (req, res) => {
    try {
        const { leadId, items, dueDate } = req.body;

        const lead = await LeadsModel.findById(leadId);
        if (!lead) return res.status(404).json({ error: "Lead not found" });

        if (!items || !items.length) {
            return res.status(400).json({ error: "Items are required." });
        }

        // Calculate totalAmount
        const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // Create PaymentIntent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100),
            currency: "usd",
            metadata: { leadId: lead._id.toString() },
        });

        const newInvoice = new InvoiceModel({
            leadId,
            items,
            totalAmount,
            dueDate,
            stripePaymentIntentId: paymentIntent.id,
            status: "Pending",
        });

        await newInvoice.save();
        res.status(201).json({
            message: "Invoice created successfully.",
            invoice: newInvoice,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.InvoiceGet = async (req, res) => {
    try {
        const invoices = await InvoiceModel.find({});
        return res.status(200).json(invoices);
    } catch (error) {
        res.status().json({ message: error.message });
    }
};

exports.InvoiceGetById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await InvoiceModel.findById(id);
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        return res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.InvoiceUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, stripePaymentIntentId } = req.body;

        // Validate invoice
        const invoice = await InvoiceModel.findById(id);
        if (!invoice) return res.status(404).json({ error: "Invoice not found" });

        // Check Payment Status from Stripe
        if (stripePaymentIntentId) {
            const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
            if (paymentIntent.status === "succeeded") {
                status = "Paid";
            }
        }

        const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
            id,
            { status, stripePaymentIntentId },
            { new: true }
        );

        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.InvoiceDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await InvoiceModel.findByIdAndDelete(id);
        if (!deletedInvoice) return res.status(404).json({ error: "Invoice not found" });
        res.json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};