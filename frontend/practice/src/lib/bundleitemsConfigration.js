import axios from "axios";

const API_BASE = "http://localhost:5000/api/bundleitems";

export const createbundleitems = async (data)=>axios.post(`${API_BASE}`, data);
export const fetchbundleitems = async ()=> axios.get(`${API_BASE}`);
export const editbundleitems = async (id, data)=> axios.put(`${API_BASE}/${id}`, data);
export const deleteBundleItem = async (id) => axios.delete(`${API_BASE}/${id}`);
