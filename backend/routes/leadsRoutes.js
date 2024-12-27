const express = require("express");
const router = express.Router();
const { CreateLeads, GetAllLeads, DeleteLeadsByItsId, UpdateLeadByItsId, GetLeadsById } = require("../controllers/leadsController");

router.post("/lead/create", CreateLeads);
router.get("/lead/get-all", GetAllLeads);
router.get("/lead/get/:id", GetLeadsById);
router.delete("/lead/delete/:id", DeleteLeadsByItsId);
router.put("/lead/update/:id", UpdateLeadByItsId);

module.exports = router;