const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { CreateOrder, GetAllOrders } = require("../controllers/orderController");

router.post("/order/create", CreateOrder);
router.get("/order/get-all", GetAllOrders);
router.post("/api/payment-intent", async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;