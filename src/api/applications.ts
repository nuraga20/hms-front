import api from './config';

export const createApplicationForm = (data: any) => api.post('/api/application-forms', data);
export const getApplicationForms = () => api.get('/api/application-forms');
export const getApplicationFormById = (id: string) => api.get(`/api/application-forms/${id}`);
export const updateApplicationForm = (id: string, data: any) => api.put(`/api/application-forms/${id}`, data);
export const deleteApplicationForm = (id: string) => api.delete(`/api/application-forms/${id}`); 