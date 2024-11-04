const express = require("express");
const { CreateLeads, GetAllLeads, UpdateLeads, DeleteLead } = require("../controllers/leadsController");
const router = express.Router();

router.post("/create", CreateLeads);
router.get("/get-all", GetAllLeads);
router.put("/update/:id", UpdateLeads);
router.delete("/delete/:id", DeleteLead);

module.exports = router;