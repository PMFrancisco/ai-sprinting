const { PrismaClient } = require("@prisma/client");
const { createSprints: createSprintsUtil } = require("../utils/openaiUtils");

const prisma = new PrismaClient();

const createSprints = async (req, res) => {
  const projectDetails = req.body;
  try {
    const sprints = await createSprintsUtil(projectDetails);
    res.json({ sprints });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createSprints };