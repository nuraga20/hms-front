import api from './config';

// Contract endpoints
export const getAllContracts = () => api.get('/api/contracts');
export const getContractById = (id: string) => api.get(`/api/contracts/${id}`);
export const createContract = (data: any) => api.post('/api/contracts', data);
export const updateContract = (id: string, data: any) => api.put(`/api/contracts/${id}`, data);
export const deleteContract = (id: string) => api.delete(`/api/contracts/${id}`);
export const getContractsByResident = (residentId: string) => api.get(`/api/contracts/resident/${residentId}`);
export const getContractsByRoom = (roomId: string) => api.get(`/api/contracts/room/${roomId}`);
export const getActiveContracts = () => api.get('/api/contracts/active');
export const getExpiredContracts = () => api.get('/api/contracts/expired');
export const searchContracts = (query: string) => api.get(`/api/contracts/search?q=${query}`); 