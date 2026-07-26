import WaterUsage from '../models/WaterUsage.js';
import User from '../models/User.js';

// @desc    Add water usage
// @route   POST /api/water
// @access  Private
export const addUsage = async (req, res, next) => {
  try {
    const { amount, category, date, notes, source, aiEstimated } = req.body;

    const usage = await WaterUsage.create({
      user: req.user._id,
      amount,
      category,
      date: date || Date.now(),
      notes,
      source,
      aiEstimated,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    res.status(201).json({ success: true, data: usage });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all user's water usage history
// @route   GET /api/water/history
// @access  Private
export const getUsageHistory = async (req, res, next) => {
  try {
    const { period } = req.query; // daily, weekly, monthly, yearly
    let dateFilter = {};
    
    if (period === 'weekly') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      dateFilter = { date: { $gte: lastWeek } };
    } else if (period === 'monthly') {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      dateFilter = { date: { $gte: lastMonth } };
    }

    const usages = await WaterUsage.find({ user: req.user._id, ...dateFilter }).sort({ date: -1 });

    res.json({ success: true, count: usages.length, data: usages });
  } catch (error) {
    next(error);
  }
};

// @desc    Update specific usage log
// @route   PUT /api/water/:id
// @access  Private
export const updateUsage = async (req, res, next) => {
  try {
    let usage = await WaterUsage.findById(req.params.id);

    if (!usage) {
      res.status(404);
      throw new Error('Usage log not found');
    }

    if (usage.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this log');
    }

    usage = await WaterUsage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: usage });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete usage log
// @route   DELETE /api/water/:id
// @access  Private
export const deleteUsage = async (req, res, next) => {
  try {
    const usage = await WaterUsage.findById(req.params.id);

    if (!usage) {
      res.status(404);
      throw new Error('Usage log not found');
    }

    if (usage.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this log');
    }

    await usage.deleteOne();
    res.json({ success: true, message: 'Usage log removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get usage analytics (daily, weekly, monthly reports)
// @route   GET /api/water/analytics
// @access  Private
export const getAnalytics = async (req, res, next) => {
  try {
    const { period = 'weekly' } = req.query; // daily, weekly, monthly
    const userId = req.user._id;
    let startDate = new Date();
    let groupByFormat;

    if (period === 'daily') {
      startDate.setHours(0, 0, 0, 0); // Start of today
      groupByFormat = "%H"; // Group by hour
    } else if (period === 'weekly') {
      startDate.setDate(startDate.getDate() - 7);
      groupByFormat = "%Y-%m-%d"; // Group by day
    } else if (period === 'monthly') {
      startDate.setMonth(startDate.getMonth() - 1);
      groupByFormat = "%Y-%m-%d"; // Group by day
    } else {
      startDate = new Date(0); // All time
      groupByFormat = "%Y-%m"; // Group by month
    }

    const aggregation = await WaterUsage.aggregate([
      { 
        $match: { 
          user: userId,
          date: { $gte: startDate }
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: groupByFormat, date: "$date" } },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Calculate total
    const totalUsage = aggregation.reduce((acc, curr) => acc + curr.totalAmount, 0);

    res.json({ 
      success: true, 
      period, 
      totalUsage,
      data: aggregation 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category-wise analytics
// @route   GET /api/water/analytics/category
// @access  Private
export const getCategoryAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    // Optional date filtering
    let dateFilter = {};
    if (req.query.days) {
      const d = new Date();
      d.setDate(d.getDate() - parseInt(req.query.days));
      dateFilter = { date: { $gte: d } };
    }

    const aggregation = await WaterUsage.aggregate([
      { 
        $match: { 
          user: userId,
          ...dateFilter
        } 
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          percentage: { $sum: 1 } // We'll calculate real percentage on the frontend or below
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    // Calculate real percentages
    const totalUsage = aggregation.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const dataWithPercentages = aggregation.map(item => ({
      category: item._id,
      amount: item.totalAmount,
      percentage: totalUsage === 0 ? 0 : ((item.totalAmount / totalUsage) * 100).toFixed(2)
    }));

    res.json({ 
      success: true, 
      totalUsage,
      data: dataWithPercentages 
    });
  } catch (error) {
    next(error);
  }
};
