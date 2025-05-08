import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.post(
        '/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data) {
        setAuthUser(data);
        toast.success('Logged in successfully!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-20"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered"
        disabled={isLoading}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered"
        disabled={isLoading}
        required
      />
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginPage;
