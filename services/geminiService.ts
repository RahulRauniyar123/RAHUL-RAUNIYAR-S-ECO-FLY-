import { GoogleGenAI, Type } from "@google/genai";
import type { AirportSuggestion } from '../types';

// This file handles all communication with the Google Gemini API.

// IMPORTANT: The user's API key is automatically injected by the environment.
// We must use `process.env.API_KEY` to initialize the client.
// The '!' tells TypeScript that we are sure this value will not be null.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// This is the schema we expect the Gemini API to return.
// It helps ensure the response is in a predictable JSON format, which makes our code safer.
const airportSuggestionsSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      iata: {
        type: Type.STRING,
        description: 'The 3-letter IATA code of the airport.',
      },
      name: {
        type: Type.STRING,
        description: 'The official name of the airport.',
      },
      city: {
        type: Type.STRING,
        description: 'The primary city served by the airport.',
      },
      country: {
        type: Type.STRING,
        description: 'The country where the airport is located.',
      },
      lat: {
        type: Type.NUMBER,
        description: 'The latitude of the airport.',
      },
      lon: {
        type: Type.NUMBER,
        description: 'The longitude of the airport.',
      },
    },
    required: ['iata', 'name', 'city', 'country', 'lat', 'lon'],
  },
};

/**
 * Fetches airport suggestions from the Gemini API based on a user's query.
 * @param query The user's search term (e.g., "Kathmandu" or "KTM").
 * @returns A promise that resolves to an array of AirportSuggestion objects.
 */
export const fetchAirportSuggestions = async (query: string): Promise<AirportSuggestion[]> => {
  try {
    // We create a specific prompt for the AI to get accurate airport data.
    const prompt = `Find airports matching "${query}". Return up to 5 suggestions with their IATA code, name, city, country, latitude, and longitude.`;
    
    // Call the Gemini API to generate content based on our prompt and schema.
    // The model 'gemini-2.5-flash' is chosen for this basic text task as per guidelines.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: airportSuggestionsSchema,
      },
    });

    // Extract the text response from the API result.
    const responseText = response.text;
    
    // The response text is a JSON string, so we parse it into a JavaScript object.
    const suggestions = JSON.parse(responseText);
    
    // We must ensure the result is an array before returning it.
    if (Array.isArray(suggestions)) {
      return suggestions;
    }
    return [];

  } catch (error) {
    // If anything goes wrong, we log the error and return an empty array
    // to prevent the app from crashing. This makes our app more robust.
    console.error("Error fetching airport suggestions:", error);
    return [];
  }
};
