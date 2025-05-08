import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button
        className="btn btn-error ml-4"
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}

export default HomePage;
