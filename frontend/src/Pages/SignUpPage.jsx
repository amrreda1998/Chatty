import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios.js';
import useAuthStore from '../store/useAuthStore.js';
import toast from 'react-hot-toast';

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return toast.error('Please fill in all fields');
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post('/auth/signup', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      if (data.success) {
        setAuthUser(data);
        toast.success('Account created successfully!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full p-6 space-y-6 bg-base-100 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-base-content/60 mt-2">
            Join our community and start chatting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="grow"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </label>
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="grow"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </label>
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="grow"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </label>
          </div>

          {/* Confirm Password Input */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                />
              </svg>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="grow"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Sign Up'
            )}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
