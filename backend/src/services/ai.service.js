import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({});
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export const generateWaterSavingTips = async (userData, currentUsage) => {
  try {
    const prompt = `Based on a user's water usage of ${currentUsage} liters today, generate 3 short, personalized, actionable water-saving tips. Respond in plain text format without markdown formatting.`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Error generating AI tips:', error.message);
    return 'Turn off the tap while brushing your teeth to save up to 15 liters of water a day.';
  }
};

export const predictNextWeekUsage = async (historyData) => {
  try {
    const prompt = `Analyze this water usage history data: ${JSON.stringify(historyData)}. Predict the total water usage for next week in liters. Only return the number.`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return parseInt(response.text.trim()) || 1000;
  } catch (error) {
    console.error('Error generating AI prediction:', error.message);
    return 1000;
  }
};

export const chatWithAI = async (message, chatHistory = []) => {
  try {
    const prompt = `You are an AI Water Conservation Assistant. Answer the user's question about water saving, plumbing, or their usage clearly and concisely.\n\nUser: ${message}\nAssistant:`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Error in AI Chat:', error.message);
    return 'Here are 3 quick ways to save water at home:\n1. Fix leaky faucets (saves up to 75L/day).\n2. Take 5-minute showers instead of baths.\n3. Turn off running water while brushing teeth.';
  }
};

export const detectLeaks = async (usageData) => {
  try {
    const prompt = `Analyze the following hourly water usage data: ${JSON.stringify(usageData)}. Does this pattern suggest a potential water leak (e.g., continuous baseline usage during the night)? Provide a short analysis and 2 leak detection suggestions if applicable.`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Error detecting leaks:', error.message);
    return 'Check your toilets and faucets for slow drips, which are the most common invisible leaks.';
  }
};

export const generateRecommendations = async (profileData) => {
  try {
    const prompt = `Based on a user profile with household size, location, and daily goal: ${JSON.stringify(profileData)}, generate a personalized list of 5 long-term water saving recommendations.`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Error generating recommendations:', error.message);
    return 'Install low-flow showerheads and dual-flush toilets to significantly reduce long-term consumption.';
  }
};

export const forecastUsage = async (historyData, days) => {
  try {
    const prompt = `Given this historical water usage data: ${JSON.stringify(historyData)}. Forecast the water usage for the next ${days} days. Return the result strictly as a JSON array of numbers representing liters per day. Do not include markdown or explanations.`;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    let forecastText = response.text.trim();
    if (forecastText.startsWith('```json')) {
      forecastText = forecastText.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (forecastText.startsWith('```')) {
      forecastText = forecastText.replace(/```/g, '').trim();
    }
    
    return JSON.parse(forecastText);
  } catch (error) {
    console.error('Error generating usage forecast:', error.message);
    return Array(days).fill(150);
  }
};
