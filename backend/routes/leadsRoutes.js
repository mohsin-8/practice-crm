const express = require("express");
const router = express.Router();
const { CreateLeads, GetAllLeads } = require("../controllers/leadsController");

router.post("/lead/create", CreateLeads);
router.get("/lead/get-all", GetAllLeads);

module.exports = router;