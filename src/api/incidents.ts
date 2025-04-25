import api from './config';

export const createMaintenanceRequest = (data: any) => api.post('/api/maintenance-requests', data);
export const getAllMaintenanceRequests = () => api.get('/api/maintenance-requests');
export const getMaintenanceRequestById = (id: string) => api.get(`/api/maintenance-requests/${id}`);
export const getMaintenanceRequestsByUser = (userId: string) => api.get(`/api/maintenance-requests/user/${userId}`);
export const getMaintenanceRequestsByLease = (leaseId: string) => api.get(`/api/maintenance-requests/lease/${leaseId}`);
export const getMaintenanceRequestsByStatus = (status: string) => api.get(`/api/maintenance-requests/status/${status}`);
export const updateMaintenanceRequest = (id: string, data: any) => api.put(`/api/maintenance-requests/${id}`, data);
export const assignMaintenanceRequest = (requestId: string, staffId: string) => 
  api.put(`/api/maintenance-requests/${requestId}/assign/${staffId}`);
export const updateMaintenanceRequestStatus = (requestId: string, status: string) => 
  api.put(`/api/maintenance-requests/${requestId}/status/${status}`);
export const markMaintenanceRequestAsPaid = (requestId: string) => 
  api.put(`/api/maintenance-requests/${requestId}/mark-paid`);
export const markMaintenanceRequestAsCompleted = (requestId: string) => 
  api.put(`/api/maintenance-requests/${requestId}/mark-completed`);
export const deleteMaintenanceRequest = (id: string) => api.delete(`/api/maintenance-requests/${id}`); 