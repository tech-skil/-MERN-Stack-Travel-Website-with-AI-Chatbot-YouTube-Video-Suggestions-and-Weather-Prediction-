import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("All environment variables:", import.meta.env);
console.log("VITE_GEMINI_API_KEY:", import.meta.env.VITE_GEMINI_API_KEY);

// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("API_KEY is undefined or empty");
  throw new Error("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 500,
  stopSequences: ["End", "end", "stop", "close"],
};

let chat;

const createPrompt = (userInput) => {
  return `Provide a brief, engaging tour guide for the location mentioned or implied in this query: "${userInput}". Include:
1. Quick history snapshot
2. Top 2-3 must-see attractions
3. One local specialty or unique feature
4. A nearby day-trip suggestion
5. A local culture tip
Keep it concise, friendly, full of details, and exciting!`;
};

const isGreeting = (input) => {
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'howdy'];
  return greetings.some(greeting => input.toLowerCase().includes(greeting));
};

export const initializeChat = () => {
  chat = model.startChat({
    generationConfig,
    history: [],
  });
};

export const sendMessage = async (userInput) => {
  if (!chat) {
    initializeChat();
  }

  if (isGreeting(userInput)) {
    return "Hello! I'm Triplo, your travel buddy! How can I help you?";
  }

  const prompt = createPrompt(userInput);
  try {
    const result = await chat.sendMessage(prompt);
    return result.response.text().replace(/##/g, '').trim();
  } catch (error) {
    console.error('Error sending message:', error);
    return "I'm sorry, there was an error processing your request. Please try again later.";
  }
};