const { PrismaClient } = require("@prisma/client");
const { createSessionContext, generateSprintGoals, createSprints: createSprintsUtil, generateProjectIdeas } = require("../utils/openaiUtils");

const prisma = new PrismaClient();

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
  const projectDetails = req.body;
  try {
    const sprints = await createSprintsUtil(projectDetails);
    res.json({ sprints });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const saveGeneratedSprint = async (req, res) => {
  const projectDetails = req.body;
  try {
    const sprints = await createSprintsUtil(projectDetails);

    for (const sprint of sprints) {
      const createdSprint = await prisma.sprint.create({
        data: {
          name: sprint.sprintTitle,
          description: sprint.sprintDescription,
          start: new Date(),
          end: new Date(),
          projectId: projectDetails.projectId,
        },
      });

      for (const task of sprint.tasks) {
        await prisma.task.create({
          data: {
            title: task.title,
            description: task.description,
            status: "pending",
            sprintId: createdSprint.id,
            projectId: projectDetails.projectId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
    }

    res.status(201).json({ message: "Sprints and tasks saved successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { generateIdeas, createSprints, saveGeneratedSprint };