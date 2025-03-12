const express = require("express");
const { getTransactions, createTransaction, getTransactionById, getDisputedTransactions } = require("../controllers/transactionsController");
const router = express.Router();

router.get("/transactions", getTransactions);
router.post("/create-transactions", createTransaction);
router.get("/transactions/:id", getTransactionById);
router.get("/transactions/disputed", getDisputedTransactions);

module.exports = router;