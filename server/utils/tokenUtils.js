const jwt = require("jsonwebtoken");

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" },
  );
  return { accessToken, refreshToken };
};

const saveUserWithToken = async (user, refreshToken) => {
  user.refreshToken = refreshToken;
  await user.save();
};

module.exports = {
  generateTokens,
  saveUserWithToken,
};
