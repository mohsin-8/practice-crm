const express = require("express");
const { userDetails } = require("../controllers/userController");
const router = express.Router();

router.get("/hr/users", userDetails);

module.exports = router;