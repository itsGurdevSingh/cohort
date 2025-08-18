require("dotenv").config()
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GoogleGenAI });

const generateResponse = async (chatHistory) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: chatHistory,
    config: {
      systemInstruction: "you are an chat assitant",
    },
  });
  return response.text;
}



module.exports = generateResponse;