import API from './api';

export const waterService = {
  addUsage: async (formData) => {
    const response = await API.post('/water', formData, {
      headers: {
        'Content-Type': formData instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  },

  getHistory: async (period) => {
    const response = await API.get('/water/history', { params: { period } });
    return response.data;
  },

  deleteUsage: async (id) => {
    const response = await API.delete(`/water/${id}`);
    return response.data;
  },

  getAnalytics: async (period) => {
    const response = await API.get('/water/analytics', { params: { period } });
    return response.data;
  },

  getCategoryAnalytics: async (days) => {
    const response = await API.get('/water/analytics/category', { params: { days } });
    return response.data;
  },

  getDashboardSummary: async () => {
    const response = await API.get('/dashboard/summary');
    return response.data;
  },

  getDashboardCharts: async () => {
    const response = await API.get('/dashboard/charts');
    return response.data;
  },

  getAITips: async () => {
    const response = await API.get('/ai/tips');
    return response.data;
  },

  getAIPrediction: async () => {
    const response = await API.get('/ai/predict');
    return response.data;
  },

  postAIChat: async (message, history = []) => {
    const response = await API.post('/ai/chat', { message, history });
    return response.data;
  },
};
