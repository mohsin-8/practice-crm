const express = require("express");
const router = express.Router();
const { CreateOrder, GetAllOrderList } = require("../controllers/orderController");

router.post("/order/create", CreateOrder);
router.get("/order/list", GetAllOrderList);

module.exports = router;