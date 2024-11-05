const express = require("express");
const router = express.Router();
const { CreateProduct } = require("../controllers/productsController");
router.post("/product/create", CreateProduct);

module.exports = router;