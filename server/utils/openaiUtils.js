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
          content: `Generate project ideas based on the following description: ${description}. Please respond in the same language as the description and in JSON format.`,
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
          content: `Describe in detail the task called "${taskTitle}" in the context of a project with the following description: ${projectDescription}. Please respond in the same language as the description and in JSON format.`,
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
  
  async function createSessionContext(projectDetails) {
    const initialPrompt = `
      You are an expert in agile project planning. I want you to generate a detailed sprint plan for a project using Scrum methodology. Here are the project details:
      
      - Project name: ${projectDetails.name}
      - Project type: ${projectDetails.type}
      - Sprint duration: ${projectDetails.sprintDuration}
      - Project complexity: ${projectDetails.complexity}
      
      The responses should be in JSON format with the following structure:
      {
        "sprints": [
          {
            "sprintTitle": "Sprint title",
            "sprintDescription": "Sprint goal description",
            "tasks": [
              {
                "title": "Task title",
                "description": "Brief task description",
                "estimate": "Time estimate (in hours or days)"
              }
            ],
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
          role: "system",
          content: initialPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
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
  
  async function generateSprintGoals(projectDetails) {
    const goalsPrompt = `
      Generate sprint goals for a project using Scrum methodology. Here are the project details:
      
      - Project name: ${projectDetails.name}
      - Project type: ${projectDetails.type}
      - Project complexity: ${projectDetails.complexity}
      
      Return a list of 3-5 sprint goals in JSON format.
      Please respond in the same language as the project details and in JSON format.
    `;
  
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Always respond in JSON format with the requested structure.`,
        },
        {
          role: "user",
          content: goalsPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
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
  
  async function createSprints(projectDetails) {
    if (!projectDetails.sprintGoals || !Array.isArray(projectDetails.sprintGoals)) {
      projectDetails.sprintGoals = [];
    }
  
    if (projectDetails.sprintGoals.length === 0) {
      projectDetails.sprintGoals = await generateSprintGoals(projectDetails);
    }
  
    await createSessionContext(projectDetails);
  
    const sprintPrompt = `
      Generate a detailed sprint plan for a project using Scrum methodology. Here are the project details:
      
      - Project name: ${projectDetails.name}
      - Project type: ${projectDetails.type}
      - Sprint duration: ${projectDetails.sprintDuration}
      - Project complexity: ${projectDetails.complexity}
      - Sprint goals: ${projectDetails.sprintGoals}
      
      The responses should be in JSON format with the following structure:
      {
        "sprints": [
          {
            "sprintTitle": "Sprint title",
            "sprintDescription": "Sprint goal description",
            "tasks": [
              {
                "title": "Task title",
                "description": "Brief task description",
                "estimate": "Time estimate (in hours or days)"
              }
            ],
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
  
  module.exports = { createSessionContext, generateSprintGoals, createSprints, generateProjectIdeas, generateTaskDescription };