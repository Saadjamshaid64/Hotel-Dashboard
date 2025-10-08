import axios from "axios";

const API_BASE = "http://localhost:5000/api/user";

export const getUsers = async () => axios.get(`${API_BASE}`);

export const createUsers = async (data) => axios.post(`${API_BASE}`, data);

export const updateUser = async (id, data) => axios.put(`${API_BASE}/${id}`, data)

export const deleteUser = async (id) => axios.delete(`${API_BASE}/${id}`)