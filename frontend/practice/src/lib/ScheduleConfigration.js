import axios from "axios"
const API_BASE = "http://localhost:5000/api/schedule"

export const createschedule = async (data)=>axios.post(`${API_BASE}`, data)
export const fetchschedule = async ()=>axios.get(`${API_BASE}`)
export const editschedule = async(id, data)=>axios.put(`${API_BASE}/${id}`, data)
export const deleteschedule = async(id)=>axios.delete(`${API_BASE}/${id}`)