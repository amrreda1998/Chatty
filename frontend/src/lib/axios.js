import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://chatty-backend-blue.vercel.app',
  withCredentials: true,
});
