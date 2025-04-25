const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const {
  getDashboardMetrics,
  getWeeklyStats,
  getActiveVouchers
} = require('../controllers/dashboardController');

// All dashboard routes require authentication and admin privileges
router.use(isAuthenticated, isAdmin);

// Get all dashboard metrics
router.get('/metrics', getDashboardMetrics);

// Get weekly statistics
router.get('/weekly-stats', getWeeklyStats);

// Get active vouchers
router.get('/vouchers', getActiveVouchers);

module.exports = router; 