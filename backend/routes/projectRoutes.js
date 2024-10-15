const express = require("express");
const { CreateProject, GetAllProjects, GetProjectById, DeleteUserFromProjects, DeleteProjectById } = require("../controllers/projectController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authenticate, authorize("team lead"), CreateProject);
router.get("/", authenticate, GetAllProjects);
router.get("/:id", authenticate, GetProjectById);
router.delete("/:projectId/members/:memberId", authenticate, authorize("team lead"), DeleteUserFromProjects);
router.delete("/delete/:id", authenticate, DeleteProjectById);
module.exports = router;