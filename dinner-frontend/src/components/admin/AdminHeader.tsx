import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';

interface AdminHeaderProps {
  userAvatar?: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userAvatar, searchQuery, onSearchChange }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (!lastSegment) return 'Dashboard';
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <div className="bg-black p-4 flex justify-between items-center fixed w-full top-0 z-10">
      {/* Logo and Page Title */}
      <div className="flex items-center">
        <Link to="/admin" className="text-white text-xl font-bold mr-8">
          Diningning
        </Link>
        <span className="text-white text-sm">Page/ {getPageTitle()}</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-3xl mx-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="search for features, products, settings and more"
            className="w-full px-4 py-2 pl-10 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="text-white hover:text-gray-300">
          <FaBell className="text-xl" />
        </button>
        <div className="flex items-center bg-zinc-800 px-3 py-1 rounded-full cursor-pointer">
          <img
            src={userAvatar || "https://via.placeholder.com/32"}
            alt="Admin"
            className="w-8 h-8 rounded-full mr-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/32";
            }}
          />
          <span className="text-white">Admin ▼</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader; 