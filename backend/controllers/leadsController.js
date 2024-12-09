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
        res.status(200).json({ message: "Leads created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.GetAllLeads = async (req, res) => {
    try {
        const leadsData = await LeadsModel.find({});
        res.status(200).json(leadsData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};