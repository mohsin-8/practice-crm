const TransactionModel = require("../models/Transactions");
const InvoiceModel = require("../models/Invoice");

exports.stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            const invoice = await InvoiceModel.findOneAndUpdate(
                { stripePaymentIntentId: paymentIntent.id },
                { status: "Paid" },
                { new: true }
            );

            if (invoice) {
                await TransactionModel.create({
                    invoice: invoice._id,
                    amountPaid: paymentIntent.amount / 100,
                    paymentMethod: "Stripe",
                    transactionId: paymentIntent.id,
                    stripeChargeId: paymentIntent.charges.data[0].id,
                    status: "Success",
                });
            }
            break;

        case "charge.dispute.created": // Handle Chargeback Initiation
            const dispute = event.data.object;
            await TransactionModel.findOneAndUpdate(
                { stripeChargeId: dispute.charge },
                { chargebackStatus: "Disputed" }
            );
            break;

        case "charge.dispute.closed": // Handle Chargeback Outcome
            const closedDispute = event.data.object;
            const chargebackResult = closedDispute.status === "won" ? "Won" : "Lost";

            await TransactionModel.findOneAndUpdate(
                { stripeChargeId: closedDispute.charge },
                { chargebackStatus: chargebackResult }
            );

            // Optionally reverse the invoice if the chargeback is lost
            if (chargebackResult === "Lost") {
                await InvoiceModel.findOneAndUpdate(
                    { stripePaymentIntentId: closedDispute.payment_intent },
                    { status: "Chargeback" }
                );
            }
            break;
    }

    res.status(200).json({ received: true });
};