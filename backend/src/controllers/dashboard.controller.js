import WaterUsage from '../models/WaterUsage.js';
import User from '../models/User.js';

// @desc    Get dashboard summary statistics
// @route   GET /api/dashboard/summary
// @access  Private
export const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get today's usage
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysUsageList = await WaterUsage.find({
      user: userId,
      date: { $gte: today },
    });

    const todaysUsage = todaysUsageList.reduce((acc, curr) => acc + curr.amount, 0);

    // Get monthly usage
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlyUsageList = await WaterUsage.find({
      user: userId,
      date: { $gte: startOfMonth },
    });

    const monthlyUsage = monthlyUsageList.reduce((acc, curr) => acc + curr.amount, 0);

    // Calculate generic water saved (mock logic: daily goal - today's usage)
    const dailyGoal = req.user.preferences.dailyGoal || 150;
    const waterSaved = Math.max(0, dailyGoal - todaysUsage);

    res.json({
      success: true,
      data: {
        todaysUsage,
        monthlyUsage,
        waterSaved,
        ecoPoints: req.user.ecoPoints,
        dailyGoal,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chart data for dashboard
// @route   GET /api/dashboard/charts
// @access  Private
export const getDashboardCharts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    // Aggregate past 7 days usage
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyData = await WaterUsage.aggregate([
      { $match: { user: userId, date: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalUsage: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Aggregate category usage
    const categoryData = await WaterUsage.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          totalUsage: { $sum: "$amount" }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        weeklyData,
        categoryData,
      }
    });
  } catch (error) {
    next(error);
  }
};
