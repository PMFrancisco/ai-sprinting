const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createSprints(projectDetails) {
  const sprintPrompt = `
    Generate a detailed sprint plan for a project using Scrum methodology. Here are the project details:
    
    - Project name: ${projectDetails.name}
    - Project description: ${projectDetails.description}
    - Project type: ${projectDetails.type}
    - Sprint duration: ${projectDetails.sprintDuration}
    - Project complexity: ${projectDetails.complexity}
    
    The responses should be in JSON format with the following structure:
    {
      "projectName": "Project name",
      "projectDescription": "Project description",
      "sprints": [
        {
          "sprintTitle": "Sprint title",
          "sprintDescription": "Sprint goal description",
          "schedule": [
            {
              "day": "Day 1",
              "tasks": [
                {
                  "title": "Task title",
                  "description": "Task description for the day",
                  "estimate": "Time estimate (in hours or days)"
                }
              ]
            }
          ]
        }
      ]
    }
    Please respond in the same language as the project details and in JSON format.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: sprintPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 2500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const content = response.choices[0].message.content.trim();
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Invalid JSON response: ${content}`);
  }
}

module.exports = { createSprints };