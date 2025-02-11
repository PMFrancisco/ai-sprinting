const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateTokens, saveUserWithToken } = require("../utils/tokenUtils");
const messages = require("../utils/responseMessages");

const prisma = new PrismaClient();

const register = async (req, res) => {
  let { email, password, name } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  email = email.toLowerCase();

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: messages.INVALID_EMAIL });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: messages.INVALID_PASSWORD,
    });
  }

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      message: messages.INVALID_NAME,
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name.trim()
      },
    });

    const { accessToken, refreshToken } = generateTokens(newUser.id);
    await saveUserWithToken(newUser, refreshToken);

    res.status(201).json({
      message: messages.USER_REGISTERED_SUCCESS,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: messages.USER_NOT_FOUND });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: messages.INVALID_CREDENTIALS });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);
    await saveUserWithToken(user, refreshToken);

    res.status(200).json({
      message: messages.USER_LOGGED_IN_SUCCESS,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: messages.REFRESH_TOKEN_REQUIRED });
  }

  try {
    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) {
      return res.status(403).json({ message: messages.USER_NOT_FOUND });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: messages.INVALID_REFRESH_TOKEN });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
          decoded.id,
        );
        await saveUserWithToken(user, newRefreshToken);

        res.json({
          accessToken,
          refreshToken: newRefreshToken,
        });
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: messages.REFRESH_TOKEN_REQUIRED });
  }

  try {
    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) {
      return res.status(403).json({ message: messages.INVALID_REFRESH_TOKEN });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });

    res.status(200).json({ message: messages.USER_LOGGED_OUT_SUCCESS });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, refreshToken, logout };