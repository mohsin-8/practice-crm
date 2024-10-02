const express = require("express");
const { userDetails, userDetailsDelete, userDetailsUpdate } = require("../controllers/userController");
const router = express.Router();

router.get("/hr/users", userDetails);
router.delete("/hr/users/:id", userDetailsDelete);
router.put("/hr/users/update/:id", userDetailsUpdate);

module.exports = router;