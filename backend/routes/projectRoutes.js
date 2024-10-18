const express = require("express");
const { CreateProject, GetAllProjects, GetProjectById, DeleteUserFromProjects, DeleteProjectById, GetProjectTags, UpdateProject } = require("../controllers/projectController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authenticate, authorize("team lead", "admin"), CreateProject);
router.get("/", authenticate, GetAllProjects);
router.get("/:id", authenticate, GetProjectById);
router.delete("/:projectId/members/:memberId", authenticate, authorize("team lead", "admin"), DeleteUserFromProjects);
router.delete("/delete/:id", authenticate, DeleteProjectById);
router.put("/update/:id", authenticate, UpdateProject);
module.exports = router;