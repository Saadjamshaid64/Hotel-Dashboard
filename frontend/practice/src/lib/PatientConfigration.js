import axios from "axios"
const API_BASE_URL = "http://localhost:5000/api/patient"

export const createPatient = async(data)=> axios.post(`${API_BASE_URL}`, data)
export const getPatient = async()=> axios.get(`${API_BASE_URL}`)
export const editPatient = async(id, data)=> axios.put(`${API_BASE_URL}/${id}`, data)
export const deletePatient = async(id)=> axios.delete(`${API_BASE_URL}/${id}`)