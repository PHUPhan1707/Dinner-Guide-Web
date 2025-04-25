const { Restaurant, User, Review } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

// Get all dashboard metrics
exports.getDashboardMetrics = async (req, res) => {
  try {
    // Get total restaurants
    const totalRestaurants = await Restaurant.count();

    // Get total reviews
    const totalReviews = await Review.count();

    // Get total users (excluding admins)
    const totalUsers = await User.count({
      where: {
        role: 'user'
      }
    });

    // Get new users in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsers = await User.count({
      where: {
        role: 'user',
        createdAt: {
          [Op.gte]: sevenDaysAgo
        }
      }
    });

    // Get weekly data
    const weeklyData = await getWeeklyData();

    res.json({
      totalRestaurants,
      totalReviews,
      totalUsers,
      newUsers,
      weeklyData
    });
  } catch (error) {
    console.error('Error getting dashboard metrics:', error);
    res.status(500).json({ message: 'Error getting dashboard metrics' });
  }
};

// Get weekly statistics
exports.getWeeklyStats = async (req, res) => {
  try {
    const weeklyData = await getWeeklyData();
    res.json(weeklyData);
  } catch (error) {
    console.error('Error getting weekly stats:', error);
    res.status(500).json({ message: 'Error getting weekly stats' });
  }
};

// Get active vouchers
exports.getActiveVouchers = async (req, res) => {
  try {
    // TODO: Replace with actual voucher model when implemented
    const vouchers = [
      {
        id: 1,
        name: 'New User Discount',
        discount: 20,
        type: 'percentage',
        validityDays: 7,
        conditions: 'Valid for new users only'
      },
      {
        id: 2,
        name: 'Weekend Special',
        discount: 15,
        type: 'percentage',
        validDays: ['Saturday', 'Sunday'],
        conditions: 'Valid on weekends only'
      }
    ];

    res.json(vouchers);
  } catch (error) {
    console.error('Error getting active vouchers:', error);
    res.status(500).json({ message: 'Error getting active vouchers' });
  }
};

// Helper function to get weekly data
const getWeeklyData = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get daily reviews for the past week
  const dailyReviews = await Review.findAll({
    attributes: [
      [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-%d'), 'date'],
      [sequelize.fn('COUNT', '*'), 'count']
    ],
    where: {
      createdAt: {
        [Op.gte]: sevenDaysAgo
      }
    },
    group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-%d')],
    order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-%d'), 'ASC']],
    raw: true
  });

  // Get daily new users for the past week
  const dailyNewUsers = await User.findAll({
    attributes: [
      [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-%d'), 'date'],
      [sequelize.fn('COUNT', '*'), 'count']
    ],
    where: {
      role: 'user',
      createdAt: {
        [Op.gte]: sevenDaysAgo
      }
    },
    group: [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-%d')],
    order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m-%d'), 'ASC']],
    raw: true
  });

  // Format data for the past 7 days
  const days = [];
  const reviews = [];
  const newUsers = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    
    const reviewCount = dailyReviews.find(item => item.date === dateStr)?.count || 0;
    reviews.push(Number(reviewCount));
    
    const userCount = dailyNewUsers.find(item => item.date === dateStr)?.count || 0;
    newUsers.push(Number(userCount));
  }

  return {
    labels: days,
    reviews,
    newUsers
  };
}; 