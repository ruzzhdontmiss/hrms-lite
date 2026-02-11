import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getEmployees = async () => {
    const response = await api.get('/employees');
    return response.data;
};

export const createEmployee = async (employeeData) => {
    const response = await api.post('/employees', employeeData);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
};

export const markAttendance = async (attendanceData) => {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
};

export const getAttendance = async (employeeId) => {
    const response = await api.get(`/attendance/${employeeId}`);
    return response.data;
};

export const getAllAttendance = async (date) => {
    const response = await api.get(`/attendance${date ? `?date=${date}` : ''}`);
    return response.data;
};

export default api;
