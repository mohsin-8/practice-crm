const LeadsModel = require("../models/Leads");

exports.CreateLeads = async (req, res) => {
    try {
        const { customer, email, phone, company, lead_source } = req.body;

        const leads = new LeadsModel({
            customer,
            email,
            phone,
            company,
            lead_source
        });

        await leads.save();
        res.status(200).json({ message: "Leads created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.UpdateLeadByItsId = async (req, res) => {
    try {
        const { id } = req.params;
        const { customer, email, phone, company, lead_source } = req.body;

        if (!customer || !email || !phone || !company || !lead_source) {
            return res.status(400).send({ message: "send all required fields" });
        }

        const updateLead = await LeadsModel.findByIdAndUpdate(id, req.body);

        if (!updateLead) {
            return res.status(404).json({ message: "lead not found!" });
        }

        return res.status(200).send({ message: "lead data updated successfully" });
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

exports.DeleteLeadsByItsId = async (req, res) => {
    try {
        const { id } = req.params;
        const leadExist = await LeadsModel.findByIdAndDelete(id);
        if (!leadExist) {
            return res.status(404).json({ message: "Lead not Found" });
        }

        return res.status(200).json({ message: "Lead is Deleted Successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};