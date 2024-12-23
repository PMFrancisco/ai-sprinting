const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });
};

module.exports = {
  generateTokens,
  saveUserWithToken,
};
