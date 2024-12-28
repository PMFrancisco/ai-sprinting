const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/projects", require("./projects"));
router.use("/sprints", require("./sprints"));
router.use("/openai", require("./openai"));

module.exports = router;
