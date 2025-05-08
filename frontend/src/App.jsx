import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import { Route, Routes } from 'react-router-dom';
import useAuthStore from './store/useAuthStore.js';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={!authUser ? <LoginPage /> : <HomePage />} />
        <Route
          path="/signup"
          element={authUser ? <HomePage /> : <SignUpPage />}
        />
        <Route
          path="/login"
          element={authUser ? <HomePage /> : <LoginPage />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={!authUser ? <LoginPage /> : <ProfilePage />}
        />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;
