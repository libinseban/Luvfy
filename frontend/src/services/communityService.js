import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // adjust this to match your backend URL

export const communityService = {
  getAllCommunities: async () => {
    try {
      const response = await axios.get(`${API_URL}/communities`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCommunity: async (communityData) => {
    try {
      const response = await axios.post(`${API_URL}/communities`, communityData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  joinCommunity: async (communityId) => {
    try {
      const response = await axios.post(`${API_URL}/communities/${communityId}/join`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  leaveCommunity: async (communityId) => {
    try {
      const response = await axios.post(`${API_URL}/communities/${communityId}/leave`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 