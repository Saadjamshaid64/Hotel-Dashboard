import axios from "axios"
const API_BASE = "http://localhost:5000/api/bundle"

export const createbundle = async (data)=>axios.post(`${API_BASE}`, data)
export const fetchbundle = async ()=>axios.get(`${API_BASE}`)
export const editbundle = async(id, data)=>axios.put(`${API_BASE}/${id}`, data)
export const deletebundle = async(id)=>axios.delete(`${API_BASE}/${id}`)