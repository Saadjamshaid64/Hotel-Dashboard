import axios from "axios";

const API_BASE = "http://localhost:5000/api/provider";

export const fetchProvider = async ()=> axios.get(`${API_BASE}`)
export const createProvider = async(data)=> axios.post(`${API_BASE}`, data)
export const editProvider = async(id, data)=> axios.put(`${API_BASE}/${id}`, data)
export const deleteProvider = async(id)=> axios.delete(`${API_BASE}/${id}`)