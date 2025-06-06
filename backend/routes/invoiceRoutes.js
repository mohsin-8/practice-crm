const express = require("express");
const router = express.Router();
const { InvoiceCreate, InvoiceGet, InvoiceGetById, InvoiceUpdate, InvoiceDelete } = require("../controllers/invoiceController");

router.post("/invoice/create", InvoiceCreate);
router.get("/invoice/get-all", InvoiceGet);
router.get("/invoice/get-invoice/:id", InvoiceGetById);
router.put("/invoice/update-invoice/:id", InvoiceUpdate);
router.delete("/invoice/delete-invoice/:id", InvoiceDelete);
module.exports = router;