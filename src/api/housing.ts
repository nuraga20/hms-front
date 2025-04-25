import api from './config';

// Campus Apartments
export const getCampusApartments = () => api.get('/api/campus-apartments');
export const getCampusApartmentById = (id: string) => api.get(`/api/campus-apartments/${id}`);
export const getAvailableCampusApartments = () => api.get('/api/campus-apartments/available');
export const searchCampusApartments = (query: string) => api.get(`/api/campus-apartments/search?q=${query}`);

// Dormitory Rooms
export const getDormitoryRooms = () => api.get('/api/dormitory-rooms');
export const getDormitoryRoomById = (id: string) => api.get(`/api/dormitory-rooms/${id}`);
export const getAvailableDormitoryRooms = () => api.get('/api/dormitory-rooms/available');
export const searchDormitoryRooms = (query: string) => api.get(`/api/dormitory-rooms/search?q=${query}`);

// Townhouses
export const getTownhouses = () => api.get('/api/townhouses');
export const getTownhouseById = (id: string) => api.get(`/api/townhouses/${id}`);
export const getAvailableTownhouses = () => api.get('/api/townhouses/available');
export const searchTownhouses = (query: string) => api.get(`/api/townhouses/search?q=${query}`);

// Off-Campus Properties
export const getOffCampusProperties = () => api.get('/api/off-campus-properties');
export const getOffCampusPropertyById = (id: string) => api.get(`/api/off-campus-properties/${id}`);
export const getAvailableOffCampusProperties = () => api.get('/api/off-campus-properties/available');
export const searchOffCampusProperties = (query: string) => api.get(`/api/off-campus-properties/search?q=${query}`); 