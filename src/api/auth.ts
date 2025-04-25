// CHECK POINT 2

// auth.ts
import api from './config';

// Auth endpoints
export const login = (credentials: { email: string; password: string }) => 
  api.post('/api/auth/login', credentials);

export const register = (userData: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'student' | 'staff' | 'admin';
}) => api.post('/api/auth/register', userData);

export const logout = () => api.post('/api/auth/logout');

export const refreshToken = () => api.post('/api/auth/refresh');

export const forgotPassword = (email: string) => 
  api.post('/api/auth/forgot-password', { email });

export const resetPassword = (token: string, newPassword: string) => 
  api.post('/api/auth/reset-password', { token, newPassword });

export const verifyEmail = (token: string) => 
  api.post('/api/auth/verify-email', { token });

export const resendVerificationEmail = (email: string) => 
  api.post('/api/auth/resend-verification', { email });

export const getCurrentUser = () => api.get('/api/auth/me');

export const updateProfile = (data: {
  first_name?: string;
  last_name?: string;
  phone?: string;
  current_password?: string;
  new_password?: string;
}) => api.put('/api/auth/profile', data);
