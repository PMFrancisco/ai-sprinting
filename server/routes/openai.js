const express = require("express");
const router = express.Router();
const { createSprints } = require("../controllers/openaiControllers");
const authenticate = require("../middlewares/authMiddlewares");

router.post("/create-sprints", authenticate, createSprints);

module.exports = router;