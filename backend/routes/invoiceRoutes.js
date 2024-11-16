const express = require("express");
const { CreateInvoice, GetAllInvoice, UpdateInvoice } = require("../controllers/invoiceController");
const router = express.Router();

router.post("/invoice/create", CreateInvoice);
router.get("/invoice/get-all", GetAllInvoice);
router.put("/invoice/update/:id", UpdateInvoice);

module.exports = router;