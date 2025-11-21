import { GoogleGenAI, Type } from "@google/genai";
import { GamificationIdea } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateGamificationStrategies = async (businessType: string, targetAudience: string): Promise<GamificationIdea[]> => {
  try {
    const ai = getClient();
    
    const prompt = `
      Act as a world-class Retail Experience Consultant and Gamification Expert.
      I have a client with the following business profile:
      - Business Type: ${businessType}
      - Target Audience: ${targetAudience}

      Generate 3 distinct, creative, and actionable gamification concepts for their physical or digital retail experience.
      Focus on "Phygital" (physical + digital) experiences where possible.
      Ensure the tone is professional yet innovative.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              conceptName: {
                type: Type.STRING,
                description: "A catchy name for the gamification campaign or feature.",
              },
              mechanic: {
                type: Type.STRING,
                description: "How the game works (rules, interactions, technology used).",
              },
              expectedOutcome: {
                type: Type.STRING,
                description: "The business value (e.g., increased dwell time, social sharing, repeat visits).",
              },
            },
            required: ["conceptName", "mechanic", "expectedOutcome"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as GamificationIdea[];
  } catch (error) {
    console.error("Error generating strategies:", error);
    throw error;
  }
};