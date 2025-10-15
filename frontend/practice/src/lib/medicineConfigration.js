import axios from "axios";
const API_BASE = "http://localhost:5000/api/medicine";

export const createMedicine = async (data)=> axios.post(`${API_BASE}`, data);
export const fetchMedicine = async () => axios.get(`${API_BASE}`)
export const editMedicine = async (id, data)=> axios.put(`${API_BASE}/${id}`, data)
export const deleteMedicine = async (id)=> axios.delete(`${API_BASE}/${id}`)
