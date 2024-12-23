const { PrismaClient } = require("@prisma/client");
const messages = require("../utils/responseMessages");

const prisma = new PrismaClient();

const createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    const project = await prisma.project.create({
      data: {
        title,
        description,
        userId,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const listProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await prisma.project.findMany({
      where: { userId },
      include: { sprints: true, tasks: true },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);
    const userId = req.user.id;
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
      include: { sprints: true, tasks: true },
    });

    if (!project) return res.status(404).json({ error: messages.PROJECT_NOT_FOUND });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);
    const userId = req.user.id;
    const { title, description } = req.body;

    const project = await prisma.project.updateMany({
      where: { id: projectId, userId },
      data: { title, description },
    });

    if (project.count === 0) return res.status(404).json({ error: messages.PROJECT_NOT_FOUND });
    res.json({ message: "Project updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);
    const userId = req.user.id;

    const project = await prisma.project.deleteMany({
      where: { id: projectId, userId },
    });

    if (project.count === 0) return res.status(404).json({ error: messages.PROJECT_NOT_FOUND });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject, listProjects, getProject, updateProject, deleteProject };
