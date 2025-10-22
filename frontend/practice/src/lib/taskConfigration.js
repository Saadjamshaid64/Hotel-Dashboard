import axios from "axios";
const API_BASE = "http://localhost:5000/api/tasks";

export const createTask = async (data) => axios.post(`${API_BASE}`, data);
export const fetchTasks = async () => axios.get(`${API_BASE}`);
export const editTask = async (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteTask = async (id) => axios.delete(`${API_BASE}/${id}`);