import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore.js';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';

function PrivateRoute({ children, authUser }) {
  return authUser ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children, authUser }) {
  return !authUser ? children : <Navigate to="/" replace />;
}

function App() {
  const { authUser, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useThemeStore();

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
    <div data-theme={theme} className="bg-base-100 min-h-screen py-10" >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute authUser={authUser}>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute authUser={authUser}>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute authUser={authUser}>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute authUser={authUser}>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
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
