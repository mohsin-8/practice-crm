const express = require("express");
const router = express.Router();
const { CreateLeads } = require("../controllers/leadsController");

router.post("/lead/create", CreateLeads);

module.exports = router;