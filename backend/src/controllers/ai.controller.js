import * as aiService from '../services/ai.service.js';
import WaterUsage from '../models/WaterUsage.js';

// @desc    Get AI generated tips based on usage
// @route   GET /api/ai/tips
// @access  Private
export const getAITips = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysUsageList = await WaterUsage.find({
      user: req.user._id,
      date: { $gte: today },
    });

    const currentUsage = todaysUsageList.reduce((acc, curr) => acc + curr.amount, 0);

    // Call Gemini AI service
    const tips = await aiService.generateWaterSavingTips(req.user, currentUsage);

    res.json({ success: true, tips });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI usage prediction
// @route   GET /api/ai/predict
// @access  Private
export const getAIPrediction = async (req, res, next) => {
  try {
    // Get last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const historyData = await WaterUsage.find({
      user: req.user._id,
      date: { $gte: thirtyDaysAgo },
    }).select('amount date category');

    // Call Gemini AI service
    const predictedUsage = await aiService.predictNextWeekUsage(historyData);

    res.json({ 
      success: true, 
      predictedUsage,
      timeframe: 'Next 7 Days'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Chat with AI Assistant
// @route   POST /api/ai/chat
// @access  Private
export const postAIChat = async (req, res, next) => {
  try {
    const { message, history } = req.body;
    const responseText = await aiService.chatWithAI(message, history);
    res.json({ success: true, reply: responseText });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Leak Detection Analysis
// @route   GET /api/ai/leaks
// @access  Private
export const getLeakDetection = async (req, res, next) => {
  try {
    // Get last 48 hours of data
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentData = await WaterUsage.find({
      user: req.user._id,
      date: { $gte: twoDaysAgo },
    }).select('amount date');

    const analysis = await aiService.detectLeaks(recentData);
    res.json({ success: true, analysis });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Personalized Recommendations
// @route   GET /api/ai/recommendations
// @access  Private
export const getRecommendations = async (req, res, next) => {
  try {
    const profileData = {
      ecoPoints: req.user.ecoPoints,
      preferences: req.user.preferences
    };

    const recommendations = await aiService.generateRecommendations(profileData);
    res.json({ success: true, recommendations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Usage Forecast
// @route   GET /api/ai/forecast
// @access  Private
export const getUsageForecast = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 7;
    
    // Get last 30 days of data for forecasting baseline
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const historyData = await WaterUsage.aggregate([
      { $match: { user: req.user._id, date: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, total: { $sum: "$amount" } } }
    ]);

    const forecast = await aiService.forecastUsage(historyData, days);
    res.json({ success: true, days, forecast });
  } catch (error) {
    next(error);
  }
};
