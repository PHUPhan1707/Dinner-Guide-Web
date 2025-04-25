import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUtensils, FaTachometerAlt, FaCog, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black text-white p-6">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="mb-8">
          <Link to="/admin" className="text-2xl font-bold">
            Admin Panel
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className={`flex items-center p-3 rounded-lg hover:bg-zinc-800 ${
                  isActive('/admin') ? 'bg-zinc-800' : ''
                }`}
              >
                <FaHome className="mr-3" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/restaurants"
                className={`flex items-center p-3 rounded-lg hover:bg-zinc-800 ${
                  isActive('/admin/restaurants') ? 'bg-zinc-800' : ''
                }`}
              >
                <FaUtensils className="mr-3" /> Restaurants
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center p-3 rounded-lg hover:bg-zinc-800 ${
                  isActive('/admin/dashboard') ? 'bg-zinc-800' : ''
                }`}
              >
                <FaTachometerAlt className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className={`flex items-center p-3 rounded-lg hover:bg-zinc-800 ${
                  isActive('/admin/settings') ? 'bg-zinc-800' : ''
                }`}
              >
                <FaCog className="mr-3" /> Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Help Box */}
        <div className="bg-zinc-800 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <FaQuestionCircle className="mr-2" />
            <h3 className="font-medium">Need Help?</h3>
          </div>
          <p className="text-sm text-gray-400">
            Contact support if you're having issues with the admin panel.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 