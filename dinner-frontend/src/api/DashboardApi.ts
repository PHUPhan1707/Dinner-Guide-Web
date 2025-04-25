import axios from 'axios';
import { API_URL } from './config';
import { getAuthHeader } from './utils';

export interface DashboardMetrics {
  totalRestaurants: number;
  totalReviews: number;
  totalUsers: number;
  newUsers: number;
  weeklyData: {
    labels: string[];
    reviews: number[];
    newUsers: number[];
  };
}

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const response = await axios.get(`${API_URL}/dashboard/metrics`, getAuthHeader());
  return response.data;
};

export const getWeeklyStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard/weekly-stats`, getAuthHeader());
  return response.data;
};

export const getActiveVouchers = async () => {
  const response = await axios.get(`${API_URL}/dashboard/vouchers`, getAuthHeader());
  return response.data;
}; 