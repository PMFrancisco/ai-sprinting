const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/authControllers");
const authenticate = require("../middlewares/authMiddlewares");

router.post("/register", register);
router.post("/login", login);

router.post("/refresh-token", authenticate, refreshToken);
router.post("/logout", authenticate, logout);

module.exports = router;
