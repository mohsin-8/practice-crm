const express = require("express");
const { userDetails, userDetailsDelete, userDetailsUpdate, CreateNewUser, FetchingAssignMembers } = require("../controllers/userController");
const router = express.Router();

router.get("/hr/users", userDetails);
router.delete("/hr/users/:id", userDetailsDelete);
router.put("/hr/users/update/:id", userDetailsUpdate);
router.post("/hr/users/create-user", CreateNewUser);
router.get("/users", FetchingAssignMembers);

module.exports = router;