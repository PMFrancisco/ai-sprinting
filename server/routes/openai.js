const express = require("express");
const router = express.Router();
const { generateIdeas, createSprints } = require("../controllers/openaiControllers");

router.post("/generate-ideas", generateIdeas);
router.post("/create-sprints", createSprints);

module.exports = router;