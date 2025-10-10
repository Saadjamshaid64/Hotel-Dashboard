import axios from 'axios'

const API_BASE = "http://localhost:5000/api/role";

export const getRoles = async ()=> axios.get(`${API_BASE}`)

export const createRoles = async (data)=> axios.post(`${API_BASE}` ,data)

export const updateRoles = async (id, data)=> axios.put(`${API_BASE}/${id}` ,data)

export const deleteRoles = async (id)=> axios.delete(`${API_BASE}/${id}`)