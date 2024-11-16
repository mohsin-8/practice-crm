const InvoiceModel = require("../models/Invoice");

exports.CreateInvoice = async (req, res) => {
    try {
        const { credit, subtotal, discount, total, toBePaid, balance, merchant, currency, dueDate, companyName, customerName, createdAt, userName, orderId, status } = req.body;

        const invoice = new InvoiceModel({
            credit,
            subtotal,
            discount,
            total,
            toBePaid,
            balance,
            merchant,
            currency,
            dueDate,
            companyName,
            customerName,
            createdAt,
            userName,
            orderId,
            status
        });

        await invoice.save();
        res.status(200).json({ message: "invoice created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.GetAllInvoice = async (req, res) => {
    try {
        const invoice = await InvoiceModel.find()
            .populate({
                path: "companyName",
                select: "company"
            })
            .populate({
                path: "userName",
                select: "name"
            })

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.UpdateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { credit, subtotal, discount, total, toBePaid, balance, merchant, currency, dueDate, companyName, customerName, userName, orderId, status } = req.body;

        // Validate required fields
        const missingFields = [];
        if (credit === undefined) missingFields.push("credit");
        if (subtotal === undefined) missingFields.push("subtotal");
        if (discount === undefined) missingFields.push("discount");
        if (total === undefined) missingFields.push("total");
        if (toBePaid === undefined) missingFields.push("toBePaid");
        if (balance === undefined) missingFields.push("balance");
        if (!merchant) missingFields.push("merchant");
        if (!currency) missingFields.push("currency");
        if (!dueDate) missingFields.push("dueDate");
        if (!companyName) missingFields.push("companyName");
        if (!customerName) missingFields.push("customerName");
        if (!userName) missingFields.push("userName");
        if (!orderId) missingFields.push("orderId");
        if (!status) missingFields.push("status");

        if (missingFields.length > 0) {
            return res.status(400).json({ message: "Missing required fields", missingFields });
        }

        const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
            id,
            {
                credit, subtotal, discount, total, toBePaid, balance, merchant, currency,
                dueDate, companyName, customerName, userName, orderId, status
            },
            { new: true, runValidators: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        return res.status(200).json({ message: "Invoice updated successfully", invoice: updatedInvoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};