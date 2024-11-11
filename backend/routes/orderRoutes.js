const express = require("express");
const router = express.Router();
const { CreateOrder, GetAllOrder } = require("../controllers/orderController");

router.post("/order/create", CreateOrder);
router.get("/order/get-all", GetAllOrder);

module.exports = router;