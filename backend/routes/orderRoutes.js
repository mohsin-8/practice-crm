const express = require("express");
const router = express.Router();

const { CreateOrder, GetAllOrders } = require("../controllers/orderController");

router.post("/order/create", CreateOrder);
router.get("/order/get-all", GetAllOrders);

module.exports = router;