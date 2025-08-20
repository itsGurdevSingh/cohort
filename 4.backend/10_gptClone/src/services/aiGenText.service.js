const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const genText = async(input) => {
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents:input
    })

    return response.text;
}



module.exports = genText;