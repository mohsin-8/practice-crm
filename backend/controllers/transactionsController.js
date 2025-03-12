const TransactionModel = require("../models/Transactions");

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await TransactionModel.find()
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = await TransactionModel.create(req.body);
        res.status(201).json(newTransaction); 
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await TransactionModel.findById(req.params.id)
        if (!transaction) return res.status(404).json({ error: "Transaction not found" });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getDisputedTransactions = async (req, res) => {
    try {
        const disputedTransactions = await TransactionModel.find({ status: "Disputed" })

        if (!disputedTransactions.length) {
            return res.status(404).json({ message: "No disputed transactions found." });
        }

        res.status(200).json(disputedTransactions);
    } catch (error) {
        console.error("Error fetching disputed transactions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};