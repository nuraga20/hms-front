import api from './config';

// Maintenance request endpoints
export const getAllMaintenanceRequests = () => api.get('/api/maintenance-requests');
export const getMaintenanceRequestById = (id: string) => api.get(`/api/maintenance-requests/${id}`);
export const createMaintenanceRequest = (data: any) => api.post('/api/maintenance-requests', data);
export const updateMaintenanceRequest = (id: string, data: any) => api.put(`/api/maintenance-requests/${id}`, data);
export const deleteMaintenanceRequest = (id: string) => api.delete(`/api/maintenance-requests/${id}`);
export const getMaintenanceRequestsByResident = (residentId: string) => api.get(`/api/maintenance-requests/resident/${residentId}`);
export const getMaintenanceRequestsByRoom = (roomId: string) => api.get(`/api/maintenance-requests/room/${roomId}`);
export const getMaintenanceRequestsByStatus = (status: string) => api.get(`/api/maintenance-requests/status/${status}`);
export const getMaintenanceRequestsByPriority = (priority: string) => api.get(`/api/maintenance-requests/priority/${priority}`);
export const searchMaintenanceRequests = (query: string) => api.get(`/api/maintenance-requests/search?q=${query}`); 