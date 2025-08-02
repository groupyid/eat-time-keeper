// Main admin page with login protection
import { useState, useEffect } from 'react';
import { isAdminLoggedIn } from '@/utils/storage';
import AdminLogin from '@/components/auth/AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const checkLoginStatus = () => {
      const loggedIn = isAdminLoggedIn();
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/10">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

export default AdminPage;