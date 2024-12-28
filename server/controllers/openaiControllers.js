const { generateProjectIdeas, createSprints: createSprintsUtil } = require("../utils/openaiUtils");

const generateIdeas = async (req, res) => {
  const { description } = req.body;
  try {
    const ideas = await generateProjectIdeas(description);
    res.json({ ideas });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createSprints = async (req, res) => {
  const { projectDescription, timeAvailable, teamMembers } = req.body;
  try {
    const sprints = await createSprintsUtil(
      projectDescription,
      timeAvailable,
      teamMembers,
    );
    res.json({ sprints });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { generateIdeas, createSprints };