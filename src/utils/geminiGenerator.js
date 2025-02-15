import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export async function GenerateQuestions() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const prompt = `I am an instructor at a university creating a feedback form for students regarding the subject I teach. Generate 5 to 10 questions in JSON format that assess:

The students understanding of the subject.
The clarity and effectiveness of my teaching.
The usefulness of the course materials.
Suggestions for improvement.
Student satisfaction with the overall experience.

Each question must follow this schema:

{
  "question": "string",
  "options": ["string", "string", "string", "string"], // Optional, minimum 2 and maximum 4 options.
  "description": boolean // Optional, true if it requires a descriptive answer.
}

Each question can either have options (for multiple-choice responses) or description (set to true for open-ended text responses), but not both.
Provide a mix of questions, ensuring some are multiple-choice and some are descriptive. Keep the description questions short and to the point.

`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}
