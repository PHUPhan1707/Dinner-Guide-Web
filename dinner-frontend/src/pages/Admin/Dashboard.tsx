import React, { useState, useEffect } from 'react';
import { FaUtensils, FaUsers, FaStar, FaUserPlus } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { getDashboardMetrics, getActiveVouchers } from '../../api/DashboardApi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Voucher {
  id: number;
  name: string;
  discount: number;
  type: string;
  validityDays?: number;
  validDays?: string[];
  conditions: string;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalRestaurants: 0,
    totalReviews: 0,
    totalUsers: 0,
    newUsers: 0,
  });

  const [weeklyData, setWeeklyData] = useState<{
    labels: string[];
    reviews: number[];
    newUsers: number[];
  }>({
    labels: [],
    reviews: [],
    newUsers: [],
  });

  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch metrics and vouchers in parallel
      const [metricsResponse, vouchersResponse] = await Promise.all([
        getDashboardMetrics(),
        getActiveVouchers()
      ]);

      setMetrics({
        totalRestaurants: metricsResponse.totalRestaurants,
        totalReviews: metricsResponse.totalReviews,
        totalUsers: metricsResponse.totalUsers,
        newUsers: metricsResponse.newUsers,
      });

      setWeeklyData({
        labels: metricsResponse.weeklyData.labels,
        reviews: metricsResponse.weeklyData.reviews,
        newUsers: metricsResponse.weeklyData.newUsers,
      });

      setVouchers(vouchersResponse);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Chart configurations
  const weeklyReviewsConfig = {
    data: {
      labels: weeklyData.labels,
      datasets: [
        {
          label: 'Reviews',
          data: weeklyData.reviews,
          fill: true,
          borderColor: '#FF6B6B',
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Weekly Reviews',
          color: '#fff',
          font: {
            size: 16,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: '#fff',
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#fff',
          },
        },
      },
    },
  };

  const userDistributionData = {
    labels: ['Regular Users', 'New Users (7 days)'],
    datasets: [
      {
        data: [metrics.totalUsers - metrics.newUsers, metrics.newUsers],
        backgroundColor: ['#4CAF50', '#2196F3'],
        borderWidth: 0,
      },
    ],
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl text-gray-600">Loading dashboard data...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-black p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Restaurants</p>
                <h3 className="text-white text-2xl font-bold mt-2">{metrics.totalRestaurants}</h3>
              </div>
              <FaUtensils className="text-3xl text-gray-400" />
            </div>
          </div>

          <div className="bg-black p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Reviews</p>
                <h3 className="text-white text-2xl font-bold mt-2">{metrics.totalReviews}</h3>
              </div>
              <FaStar className="text-3xl text-gray-400" />
            </div>
          </div>

          <div className="bg-black p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <h3 className="text-white text-2xl font-bold mt-2">{metrics.totalUsers}</h3>
              </div>
              <FaUsers className="text-3xl text-gray-400" />
            </div>
          </div>

          <div className="bg-black p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New Users (7 days)</p>
                <h3 className="text-white text-2xl font-bold mt-2">{metrics.newUsers}</h3>
              </div>
              <FaUserPlus className="text-3xl text-gray-400" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Reviews Chart */}
          <div className="bg-black p-6 rounded-lg">
            <Line data={weeklyReviewsConfig.data} options={weeklyReviewsConfig.options} />
          </div>

          {/* User Distribution Chart */}
          <div className="bg-black p-6 rounded-lg">
            <h3 className="text-white text-lg mb-4">User Distribution</h3>
            <div className="w-full max-w-md mx-auto">
              <Doughnut
                data={userDistributionData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#fff',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Vouchers Section */}
        <div className="mt-6">
          <div className="bg-black p-6 rounded-lg">
            <h3 className="text-white text-lg mb-4">Active Vouchers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  className={`bg-gradient-to-r ${
                    voucher.validityDays
                      ? 'from-pink-500 to-rose-500'
                      : 'from-purple-500 to-indigo-500'
                  } p-4 rounded-lg`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white text-sm">{voucher.name}</p>
                      <h4 className="text-white text-xl font-bold mt-1">
                        {voucher.discount}% OFF
                      </h4>
                    </div>
                    <span className="text-white text-xs bg-white/20 px-2 py-1 rounded">
                      {voucher.validityDays
                        ? `Valid for ${voucher.validityDays} days`
                        : voucher.validDays?.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard; 