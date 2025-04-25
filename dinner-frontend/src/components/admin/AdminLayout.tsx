import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearchResults, setGlobalSearchResults] = useState<any[]>([]);

  useEffect(() => {
    // Check authentication and admin status
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      navigate('/auth');
      return;
    }

    const userData = JSON.parse(user);
    if (!userData.isAdmin) {
      navigate('/');
      return;
    }

    // Set user avatar
    setUserAvatar(userData.avatar || null);
  }, [navigate]);

  const handleGlobalSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      // Here you would implement your global search logic
      // This could include searching across:
      // - Restaurants
      // - Menu items
      // - Users
      // - Orders
      // - Settings
      // etc.
      
      try {
        // Example of what the search implementation might look like:
        // const results = await Promise.all([
        //   searchRestaurants(query),
        //   searchMenuItems(query),
        //   searchUsers(query),
        //   searchOrders(query)
        // ]);
        
        // setGlobalSearchResults(results.flat());
        
        // For now, we'll just pass the query to the page-specific search handler
        if (onSearch) {
          onSearch(query);
        }
      } catch (error) {
        console.error('Error performing global search:', error);
      }
    } else {
      setGlobalSearchResults([]);
      if (onSearch) {
        onSearch('');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader 
          userAvatar={userAvatar} 
          searchQuery={searchQuery}
          onSearchChange={handleGlobalSearch}
        />
        <main className="p-8 mt-20 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 