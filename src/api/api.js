// src/api.js
import axios from 'axios';

// Replace with your actual API base URL
const API_BASE_URL = 'https://your-api-domain.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: Get all players
export const getPlayers = async () => {
  try {
    const response = await api.get('/players/');
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};

// Example: Create a new player
export const createPlayer = async (playerData) => {
  try {
    const response = await api.post('/players/', playerData);
    return response.data;
  } catch (error) {
    console.error('Error creating player:', error);
    throw error;
  }
};

export default api;
