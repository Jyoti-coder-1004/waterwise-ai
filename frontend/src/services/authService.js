import API from './api';

export const authService = {
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await API.post('/auth/logout');
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await API.post('/auth/forgotpassword', { email });
    return response.data;
  },

  resetPassword: async (resetToken, password) => {
    const response = await API.put(`/auth/resetpassword/${resetToken}`, { password });
    return response.data;
  },

  getProfile: async () => {
    const response = await API.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await API.put('/users/profile', data);
    return response.data;
  },
};
