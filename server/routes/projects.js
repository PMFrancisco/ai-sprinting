const express = require("express");
const router = express.Router();
const {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsControllers");
const authenticate = require("../middlewares/authMiddlewares");

router.post("/", authenticate, createProject);
router.get("/", authenticate, listProjects);
router.get("/:id", authenticate, getProject);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

module.exports = router;
