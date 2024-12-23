const { PrismaClient } = require("@prisma/client");
const messages = require("../utils/responseMessages");

const prisma = new PrismaClient();

const createSprint = async (req, res, next) => {
  try {
    const { name, description, start, end, projectId } = req.body;
    const sprint = await prisma.sprint.create({
      data: {
        name,
        description,
        start,
        end,
        projectId,
      },
    });
    res.status(201).json(sprint);
  } catch (error) {
    next(error);
  }
};

const listSprints = async (req, res, next) => {
  try {
    const projectId = parseInt(req.query.projectId);
    const sprints = await prisma.sprint.findMany({
      where: { projectId },
      include: { tasks: true },
    });
    res.json(sprints);
  } catch (error) {
    next(error);
  }
};

const getSprint = async (req, res, next) => {
  try {
    const sprintId = parseInt(req.params.id);
    const sprint = await prisma.sprint.findUnique({
      where: { id: sprintId },
      include: { tasks: true },
    });

    if (!sprint) return res.status(404).json({ error: messages.SPRINT_NOT_FOUND });
    res.json(sprint);
  } catch (error) {
    next(error);
  }
};

const updateSprint = async (req, res, next) => {
  try {
    const sprintId = parseInt(req.params.id);
    const { name, description, start, end } = req.body;

    const sprint = await prisma.sprint.update({
      where: { id: sprintId },
      data: { name, description, start, end },
    });

    res.json({ message: messages.SPRINT_UPDATED_SUCCESS, sprint });
  } catch (error) {
    next(error);
  }
};

const deleteSprint = async (req, res, next) => {
  try {
    const sprintId = parseInt(req.params.id);

    const sprint = await prisma.sprint.delete({
      where: { id: sprintId },
    });

    res.json({ message: messages.SPRINT_DELETED_SUCCESS });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSprint, listSprints, getSprint, updateSprint, deleteSprint };