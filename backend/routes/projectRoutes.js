const express = require("express");
const { CreateProject, GetAllProjects, GetProjectById } = require("../controllers/projectController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authenticate, authorize("team lead"), CreateProject);
router.get("/", authenticate, GetAllProjects);
router.get("/:id", authenticate, GetProjectById);
module.exports = router;