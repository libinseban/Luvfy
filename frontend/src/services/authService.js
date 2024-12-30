import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to decode the JWT token here
      return token;
    }
    return null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};