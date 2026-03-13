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

    // Debug logging
    console.log(
      "[explainCode] Full response:",
      JSON.stringify(response, null, 2),
    );

    // Try multiple ways to extract text
    let text = null;

    // Method 1: Check if response has a text method
    if (typeof response.text === "function") {
      text = await response.text();
    }
    // Method 2: Check candidates array
    else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = response.candidates[0].content.parts[0].text;
    }
    // Method 3: Direct text property
    else if (response.text) {
      text = response.text;
    }
    // Method 4: response.response.text()
    else if (
      response.response &&
      typeof response.response.text === "function"
    ) {
      text = await response.response.text();
    }

    console.log("[explainCode] Extracted text:", text);

    return text || "Error generating explanation.";
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

    // Try multiple ways to extract text
    let text = null;

    if (typeof response.text === "function") {
      text = await response.text();
    } else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = response.candidates[0].content.parts[0].text;
    } else if (response.text) {
      text = response.text;
    } else if (
      response.response &&
      typeof response.response.text === "function"
    ) {
      text = await response.response.text();
    }

    return JSON.parse(text || "[]");
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

    // Debug logging
    console.log(
      "[generateTitle] Full response:",
      JSON.stringify(response, null, 2),
    );

    // Try multiple ways to extract text
    let text = null;

    // Method 1: Check if response has a text method
    if (typeof response.text === "function") {
      text = await response.text();
    }
    // Method 2: Check candidates array
    else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = response.candidates[0].content.parts[0].text;
    }
    // Method 3: Direct text property
    else if (response.text) {
      text = response.text;
    }
    // Method 4: response.response.text()
    else if (
      response.response &&
      typeof response.response.text === "function"
    ) {
      text = await response.response.text();
    }

    console.log("[generateTitle] Extracted text:", text);

    return text ? text.trim() : "Untitled Snippet";
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

    // Try multiple ways to extract text
    let text = null;

    if (typeof response.text === "function") {
      text = await response.text();
    } else if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = response.candidates[0].content.parts[0].text;
    } else if (response.text) {
      text = response.text;
    } else if (
      response.response &&
      typeof response.response.text === "function"
    ) {
      text = await response.response.text();
    }

    return text ? text.trim().toLowerCase() : "javascript";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "javascript";
  }
}
