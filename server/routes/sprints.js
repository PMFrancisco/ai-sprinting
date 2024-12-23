const express = require("express");
const router = express.Router();
const {
  createSprint,
  listSprints,
  getSprint,
  updateSprint,
  deleteSprint,
} = require("../controllers/sprintsControllers");
const authenticate = require("../middlewares/authMiddlewares");

router.post("/", authenticate, createSprint);
router.get("/", authenticate, listSprints);
router.get("/:id", authenticate, getSprint);
router.put("/:id", authenticate, updateSprint);
router.delete("/:id", authenticate, deleteSprint);

module.exports = router;