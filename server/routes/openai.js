const express = require("express");
const router = express.Router();
const { generateIdeas, createSprints, saveGeneratedSprint } = require("../controllers/openaiControllers");
const authenticate = require("../middlewares/authMiddlewares");

router.post("/generate-ideas", authenticate, generateIdeas);
router.post("/create-sprints", authenticate, createSprints);
router.post("/save-generated-sprint", authenticate, saveGeneratedSprint);

module.exports = router;