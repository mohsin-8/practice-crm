const express = require("express");
const { stripeWebhook } = require("../middlewares/stripePaymentIntent");

const router = express.Router();

router.post(
    "/stripe/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

module.exports = router;