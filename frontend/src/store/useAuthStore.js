import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useAuthStore = create((set) => ({
  authUser: null,

  setAuthUser: (user) => set({ authUser: user }),
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get('/auth/check-auth');
      set({ authUser: data.data });
      return data;
    } catch (error) {
      console.error('CheckAuth error:', error);
      set({ authUser: null });
      return null;
    }
  },
}));

export default useAuthStore;
