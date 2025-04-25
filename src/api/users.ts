import api from './config';

// Base user endpoints
export const getUserById = (id: string) => api.get(`/api/users/${id}`);
export const getUserByEmail = (email: string) => api.get(`/api/users/by-email?email=${email}`);
export const getUserByNuid = (nuid: string) => api.get(`/api/users/by-nuid?nuid=${nuid}`);
export const searchUsers = (name: string) => api.get(`/api/users/by-name?name=${name}`);
export const getAllUsers = () => api.get('/api/users');

// Student endpoints
export const getAllStudents = () => api.get('/api/students');
export const getStudentById = (id: string) => api.get(`/api/students/${id}`);
export const searchStudents = (keyword: string) => api.get(`/api/students/search?keyword=${keyword}`);
export const getStudentsByRole = (role: string) => api.get(`/api/students/role?role=${role}`);
export const getStudentRoommates = (id: string) => api.get(`/api/students/${id}/roommates`);

// Teacher endpoints
export const getAllTeachers = () => api.get('/api/teacher');
export const getTeacherById = (id: string) => api.get(`/api/teacher/${id}`);
export const searchTeachers = (keyword: string) => api.get(`/api/teacher/search?keyword=${keyword}`);

// DSS endpoints
export const getAllDss = () => api.get('/api/dss');
export const getDssById = (id: string) => api.get(`/api/dss/${id}`);
export const getDssByRole = (role: string) => api.get(`/api/dss/by-role?role=${role}`);
export const searchDss = (keyword: string) => api.get(`/api/dss/search?keyword=${keyword}`);

// Housing Manager endpoints
export const getAllHousingManagers = () => api.get('/api/housing-manager');
export const getHousingManagerById = (id: string) => api.get(`/api/housing-manager/${id}`);
export const getHousingManagersByRole = (role: string) => api.get(`/api/housing-manager/by-role?role=${role}`);
export const getHousingManagersByBlock = (block: string) => api.get(`/api/housing-manager/by-block?block=${block}`); 