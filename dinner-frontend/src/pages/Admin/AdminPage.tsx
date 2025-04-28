import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaTachometerAlt, FaCog } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminPage = () => {
  const menuItems = [
    { icon: <FaUtensils className="text-3xl" />, title: 'Restaurants', link: '/admin/restaurants' },
    { icon: <FaTachometerAlt className="text-3xl" />, title: 'Dashboard', link: '/admin/dashboard' },
    { icon: <FaCog className="text-3xl" />, title: 'Settings', link: '/admin/settings' },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8 text-zinc-800">Hello admins, welcome to your work!</h1>
        
        <div className="grid grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-black rounded-lg p-8 text-white hover:bg-zinc-800 transition-colors flex flex-col items-center justify-center"
            >
              {item.icon}
              <span className="mt-4 text-xl">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage; 