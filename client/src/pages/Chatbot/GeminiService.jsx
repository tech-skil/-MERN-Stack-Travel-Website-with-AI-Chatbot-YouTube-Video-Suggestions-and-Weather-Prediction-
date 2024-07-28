import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("API_KEY is undefined or empty");
  throw new Error("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 40,
  maxOutputTokens: 1000,
};

let chat;
let chatHistory = [];

const travelPrompts = [
  {
    type: "general",
    prompt: `Provide a comprehensive travel guide for {location}. Include:
    1. Brief history (2-3 sentences)
    2. Top 3-5 must-see attractions with short descriptions
    3. Local cuisine specialties (1-2 paragraphs)
    4. A nearby day-trip suggestion
    5. One important cultural tip for visitors`
  },
  {
    type: "itinerary",
    prompt: `Create a {duration}-day itinerary for {location}, suitable for {traveler_type}. For each day, suggest:
    1. Morning activity
    2. Lunch recommendation
    3. Afternoon activity
    4. Evening entertainment or dining option
    Include a mix of popular attractions and off-the-beaten-path experiences.`
  },
  {
    type: "budget",
    prompt: `Provide a budget breakdown for a {duration}-day trip to {location} for {number_of_travelers} {traveler_type}. Include estimates for:
    1. Accommodation
    2. Transportation
    3. Food and drinks
    4. Activities and entrance fees
    5. Miscellaneous expenses
    Suggest money-saving tips specific to this destination.`
  },
  {
    type: "transportation",
    prompt: `Explain the best ways to get around {location}. Cover:
    1. Public transportation options and costs
    2. Taxi and ride-sharing services
    3. Car rental pros and cons
    4. Walking and cycling possibilities
    5. Any unique local transportation methods`
  },
  {
    type: "accommodation",
    prompt: `Recommend accommodation options in {location} for {traveler_type} with a {budget_level} budget. For each suggestion, provide:
    1. Name and brief description
    2. Approximate price range
    3. Nearby attractions or neighborhood highlights
    4. One standout feature or amenity`
  }
];

const createPrompt = (userInput) => {
  let selectedPrompt = travelPrompts.find(p => userInput.toLowerCase().includes(p.type)) || travelPrompts[0];
  let filledPrompt = selectedPrompt.prompt;

  // Replace placeholders with generic terms if specific info isn't provided
  filledPrompt = filledPrompt.replace(/{location}/g, "the destination");
  filledPrompt = filledPrompt.replace(/{duration}/g, "your trip");
  filledPrompt = filledPrompt.replace(/{traveler_type}/g, "travelers");
  filledPrompt = filledPrompt.replace(/{number_of_travelers}/g, "your group");
  filledPrompt = filledPrompt.replace(/{budget_level}/g, "your");

  return `You are Triplo, an AI travel guide. Provide a comprehensive and engaging response based on the following query and conversation history: "${userInput}".

${filledPrompt}

If the query doesn't match the selected prompt exactly, adapt your response to best answer the user's question while incorporating relevant travel advice. Keep your response friendly, detailed, and exciting. Aim for about 250-300 words in total.`;
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
  chatHistory = [];
};

export const sendMessage = async (userInput) => {
  if (!chat) {
    initializeChat();
  }

  if (isGreeting(userInput)) {
    const greeting = "Hello! I'm Triplo, your travel buddy! How can I Assist you today?";
    chatHistory.push({ role: "model", parts: greeting });
    return greeting;
  }

  const prompt = createPrompt(userInput);
  chatHistory.push({ role: "user", parts: userInput });

  try {
    const result = await chat.sendMessage(prompt);
    const response = result.response.text().trim();
    chatHistory.push({ role: "model", parts: response });

    // Limit chat history to last 10 messages to prevent context overflow
    if (chatHistory.length > 10) {
      chatHistory = chatHistory.slice(-10);
    }

    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    return "I'm sorry, there was an error processing your request. Please try again later.";
  }
};

export const getChatHistory = () => {
  return chatHistory;
};