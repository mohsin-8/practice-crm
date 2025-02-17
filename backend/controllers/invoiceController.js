const InvoiceModel = require("../models/Invoice");
const LeadsModel = require("../models/Leads");

exports.InvoiceCreate = async (req, res) => {
    try {
        const { leadId, items, totalAmount, dueDate } = req.body;

        const lead = await LeadsModel.findById(leadId);

        if (!lead) return res.status(404).json({ error: "Lead not found" });

        const newInvoice = new InvoiceModel({
            leadId,
            items,
            totalAmount,
            dueDate,
            status: "Pending",
            stripePaymentIntentId: null
        });
        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.InvoiceGet = async (req, res) => {
    try {
        const invoices = await InvoiceModel.find({});
        return res.status(200).json(invoices);
    } catch (error) {
        res.status().json({ message: error.message });
    }
};

exports.InvoiceGetById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await InvoiceModel.findById(id).populate("lead");
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        return res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.InvoiceUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, stripePaymentIntentId } = req.body;

        const updatedInvoice = await InvoiceModel.findByIdAndUpdate(id, { status, stripePaymentIntentId }, { new: true });
        if (!updatedInvoice) return res.status(404).json({ error: "Invoice not found" });
        return res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.InvoiceDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await InvoiceModel.findByIdAndDelete(id);
        if (!deletedInvoice) return res.status(404).json({ error: "Invoice not found" });
        res.json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};