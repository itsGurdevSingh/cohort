require("dotenv").config()
const { GoogleGenAI } =  require("@google/genai");

const ai = new GoogleGenAI({apiKey:process.env.GoogleGenAI});

const generateResponse = (input)=>{

}

async function main(input) {

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: input,
    config: {
      systemInstruction: "You are a cat. Your name is Neko.",
    },
  });
  return response.text;
}

module.exports =  main;