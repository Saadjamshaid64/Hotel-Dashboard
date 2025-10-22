import axios from "axios";
const API_BASE = "http://localhost:5000/api/order";

export const createOrder = async (data)=> axios.post(`${API_BASE}`, data);
export const fetchOrder = async () => axios.get(`${API_BASE}`)
export const editOrder = async (id, data)=> axios.put(`${API_BASE}/${id}`, data)
export const deleteOrder = async (id)=> axios.delete(`${API_BASE}/${id}`)
