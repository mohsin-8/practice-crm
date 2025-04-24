const BusinessUnitsModel = require("../models/BusinessUnits");

exports.InvoiceCreate = async (req, res) => {
    try {
        const { name } = req.body;

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