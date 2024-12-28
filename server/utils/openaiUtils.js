const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateProjectIdeas(description) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Genera ideas de proyecto basadas en la siguiente descripción: ${description}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content.trim();
}

async function generateTaskDescription(taskTitle, projectDescription) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Describe detalladamente la tarea llamada "${taskTitle}" en el contexto de un proyecto que tiene la siguiente descripción: ${projectDescription}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content.trim();
}

async function createSprints(projectDescription, timeAvailable, teamMembers) {
  const taskDurations = [2, 3, 4, 5];
  const tasks = [];

  for (let i = 0; i < 10; i++) {
    const title = `Tarea ${i + 1}`;
    const description = await generateTaskDescription(
      title,
      projectDescription,
    );
    const task = {
      title,
      description,
      status: "pending",
      duration: taskDurations[Math.floor(Math.random() * taskDurations.length)],
    };
    tasks.push(task);
  }

  const sprints = [];
  let currentTime = 0;

  while (tasks.length > 0) {
    const sprintTasks = [];
    let sprintDuration = 0;

    while (sprintDuration < timeAvailable && tasks.length > 0) {
      const task = tasks.shift();
      sprintTasks.push(task);
      sprintDuration += task.duration;
    }

    const sprint = {
      name: `Sprint ${sprints.length + 1}`,
      description: `Descripción del Sprint ${sprints.length + 1}`,
      tasks: sprintTasks,
      start: new Date(
        Date.now() + currentTime * 24 * 60 * 60 * 1000,
      ).toISOString(),
      end: new Date(
        Date.now() + (currentTime + sprintDuration) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    };

    sprints.push(sprint);
    currentTime += sprintDuration;
  }

  return sprints;
}

module.exports = { generateProjectIdeas, generateTaskDescription, createSprints };