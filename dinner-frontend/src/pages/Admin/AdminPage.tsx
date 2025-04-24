import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUtensils, FaWarehouse, FaTachometerAlt, FaCog, FaSignOutAlt, FaSearch, FaQuestionCircle } from 'react-icons/fa';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const menuItems = [
    { icon: <FaUtensils className="text-3xl" />, title: 'Restaurants', link: '/admin/restaurants' },
    { icon: <FaWarehouse className="text-3xl" />, title: 'Warehouse', link: '/admin/warehouse' },
    { icon: <FaTachometerAlt className="text-3xl" />, title: 'Dashboard', link: '/admin/dashboard' },
    { icon: <FaCog className="text-3xl" />, title: 'Setting', link: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-zinc-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white">
        <div className="p-4 text-2xl font-bold border-b border-zinc-800">
          Diningning
        </div>
        <nav className="mt-4">
          <a href="#" className="flex items-center px-6 py-3 text-white hover:bg-zinc-800">
            <FaHome className="mr-3" /> Home
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-white hover:bg-zinc-800">
            <FaUtensils className="mr-3" /> Restaurants
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-white hover:bg-zinc-800">
            <FaWarehouse className="mr-3" /> Warehouse
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-white hover:bg-zinc-800">
            <FaTachometerAlt className="mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-white hover:bg-zinc-800">
            <FaCog className="mr-3" /> Setting
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center px-6 py-3 text-white hover:bg-zinc-800 w-full text-left"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </nav>

        {/* Help Box */}
        <div className="absolute bottom-8 left-4 bg-zinc-200 p-4 rounded-lg w-56">
          <div className="flex items-center mb-2">
            <FaQuestionCircle className="text-zinc-600 mr-2" />
            <span className="text-zinc-700 font-semibold">Need Help</span>
          </div>
          <p className="text-zinc-600 text-sm">If you have any questions please click it to have some help</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-black p-4 flex justify-between items-center">
          <div className="flex items-center flex-1 px-4">
            <span className="text-white mr-4">Page/ Dashboard</span>
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Search for features, services, settings and more"
                className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600"
              />
              <FaSearch className="absolute right-3 top-3 text-zinc-400" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-white cursor-pointer">
              {/* Notification bell icon would go here */}
            </div>
            <div className="flex items-center bg-zinc-800 px-3 py-1 rounded-md cursor-pointer">
              <img
                src="https://via.placeholder.com/32"
                alt="Admin"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-white">Admin ▼</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-8 text-zinc-800">Hello admins, welcome to your work!</h1>
          
          <div className="grid grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="bg-black rounded-lg p-8 text-white hover:bg-zinc-800 transition-colors flex flex-col items-center justify-center"
              >
                {item.icon}
                <span className="mt-4 text-xl">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 