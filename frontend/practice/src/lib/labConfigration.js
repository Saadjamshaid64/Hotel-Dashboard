import axios from "axios";
const API_BASE = "http://localhost:5000/api/lab";

export const createLab = async (data)=> axios.post(`${API_BASE}`, data);
export const fetchLab = async () => axios.get(`${API_BASE}`)
export const editLab = async (id, data)=> axios.put(`${API_BASE}/${id}`, data)
export const deleteLab = async (id)=> axios.delete(`${API_BASE}/${id}`)
