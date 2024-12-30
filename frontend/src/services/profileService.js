import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const profileService = {
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await axios.put(`${API_URL}/profile`, profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfilePicture: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', imageFile);
      
      const response = await axios.put(`${API_URL}/profile/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add authentication headers to all requests
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
}; 