const express = require("express");
const router = express.Router();
const { CreateOrder } = require("../controllers/orderController");

router.post("/order/create", CreateOrder);

module.exports = router;