import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function explainCode(code: string, language: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain what this ${language} code does in a short, concise paragraph for a developer's documentation: \n\n${code}`,
      config: {
        maxOutputTokens: 200,
      },
    });

    return response.text || "Error generating explanation.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating explanation.";
  }
}

export async function suggestTags(code: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3-5 keywords or tags for this code snippet. Return as a JSON array of strings: \n\n${code}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}

export async function generateTitle(code: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a concise, descriptive title (max 60 characters) for this code snippet. Return only the title text, nothing else: \n\n${code}`,
      config: {
        maxOutputTokens: 50,
      },
    });

    return response.text ? response.text.trim() : "Untitled Snippet";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Untitled Snippet";
  }
}

export async function detectLanguage(code: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Detect the programming language of this code. Return only the lowercase language name (e.g., javascript, python, typescript, java, etc.): \n\n${code}`,
      config: {
        maxOutputTokens: 10,
      },
    });

    return response.text ? response.text.trim().toLowerCase() : "javascript";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "javascript";
  }
}
