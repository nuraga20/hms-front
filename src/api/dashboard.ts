import api from './config';

export const getDashboardStats = () => api.get('/api/dashboard/stats');
export const getDashboardData = () => api.get('/api/dashboard'); 