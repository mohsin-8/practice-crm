const LeadsModel = require("../models/Leads");

exports.CreateLeads = async (req, res) => {
    try {
        const { customer, email, phone, company, lead_source, status } = req.body;

        const leads = new LeadsModel({
            customer,
            email,
            phone,
            company,
            lead_source,
            status
        });

        await leads.save();
        res.status(200).json({ message: "Lead Created Successfully", leads });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.GetAllLeads = async (req, res) => {
    try {
        const leads = await LeadsModel.find({});

        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.UpdateLeads = async (req, res) => {
    try {
        const { customer, email, phone, company, lead_source, status } = req.body;
        const { id } = req.params;

        if (customer || email || phone || company || lead_source || status) {
            return res.status(400).json({ message: "send all required fields" });
        }

        const updateLeadsData = await LeadsModel.findByIdAndUpdate(id, req.body);
        if (!updateLeadsData) {
            return res.status(404).json({ message: "lead not found!" });
        }

        return res.status(200).json({ message: "user data updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};