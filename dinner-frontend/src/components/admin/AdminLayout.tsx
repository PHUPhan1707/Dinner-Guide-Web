import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import SplashTransition from '../SplashTransition';

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
  const [showSplash, setShowSplash] = useState(false);

  // Handle page transitions
  useEffect(() => {
    setShowSplash(true);
    const timer = setTimeout(() => setShowSplash(false), 1800); // Match the total duration of the splash
    return () => clearTimeout(timer);
  }, [location.pathname]);

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
      try {
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
      <SplashTransition show={showSplash} />
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader 
          userAvatar={userAvatar} 
          searchQuery={searchQuery}
          onSearchChange={handleGlobalSearch}
        />
        <main 
          className="p-8 mt-20 ml-64" 
          style={{ 
            opacity: showSplash ? 0 : 1,
            transition: "opacity 0.8s ease-in-out",
            transitionDelay: showSplash ? "0s" : "0.6s"
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 