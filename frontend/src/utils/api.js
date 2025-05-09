import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

// Add token to requests if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem('jjAdminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const login = async (credentials) => {
  try {
    const { data } = await API.post('/auth/login', credentials);
    return data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const logout = () => {
  localStorage.removeItem('jjAdminToken');
  localStorage.removeItem('jjAdminUser');
};

// Artwork APIs
export const getArtworks = async () => {
  try {
    const { data } = await API.get('/artworks');
    return data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch artworks' };
  }
};

export const getArtworkById = async (id) => {
  try {
    const { data } = await API.get(`/artworks/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch artwork' };
  }
};

export const createArtwork = async (artworkData) => {
  try {
    const { data } = await API.post('/artworks', artworkData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create artwork' };
  }
};

export const updateArtwork = async (id, artworkData) => {
  try {
    const { data } = await API.put(`/artworks/${id}`, artworkData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update artwork' };
  }
};

export const deleteArtwork = async (id) => {
  try {
    const { data } = await API.delete(`/artworks/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete artwork' };
  }
};

export default API; 