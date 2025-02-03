const express = require("express");
const router = express.Router();
const { InvoiceCreate } = require("../controllers/invoiceController");

router.post("/invoice/create", InvoiceCreate);
module.exports = router;