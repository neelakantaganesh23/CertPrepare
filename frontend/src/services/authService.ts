import api from './api';

export const authService = {
  register: async (data: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },
};
