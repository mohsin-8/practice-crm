const express = require("express");
const { CreateLeads, GetAllLeads, UpdateLeads } = require("../controllers/leadsController");
const router = express.Router();

router.post("/create", CreateLeads);
router.get("/get-all", GetAllLeads);
router.get("/update/:id", UpdateLeads);

module.exports = router;