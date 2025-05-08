import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore.js';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

function ProfilePage() {
  const { setAuthUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    profilePic: '',
  });
  const [previewImage, setPreviewImage] = useState('');

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axiosInstance.get('/users/profile');
        if (data.success) {
          const userData = data.data;
          setFormData({
            fullName: userData.fullName || '',
            email: userData.email || '',
            profilePic: userData.profilePic || '',
          });
          setPreviewImage(userData.profilePic || '');
        }
      } catch (error) {
        toast.error('Failed to fetch profile data');
        console.error('Profile fetch error:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        // 2MB limit
        toast.error('Image size should be less than 2MB');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        profilePic: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName.trim());
      formDataToSend.append('email', formData.email.trim());

      if (formData.profilePic instanceof File) {
        formDataToSend.append('image', formData.profilePic);
      }

      const { data } = await axiosInstance.put(
        '/users/profile',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        setAuthUser(data.data);//updating the user state in the browser
        setFormData({
          fullName: data.data.fullName,
          email: data.data.email,
          profilePic: data.data.profilePic,
        });
        setPreviewImage(data.data.profilePic);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full p-6 space-y-6 bg-base-100 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  previewImage ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${formData.fullName}`
                }
                alt="Profile"
              />
            </div>
          </div>

          {!isEditing ? (
            // View Mode
            <div className="space-y-4 w-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold">{formData.fullName}</h2>
                <p className="text-base-content/60">{formData.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-outline w-full"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <label className="btn btn-sm btn-outline w-full">
                Change Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
              </label>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input input-bordered"
                  disabled={isLoading}
                  required
                  minLength={3}
                  maxLength={50}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
