import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getStocks = () => api.get('/stocks');
export const addStock = (stock) => api.post('/stocks', stock);
export const updateStock = (id, stock) => api.put(`/stocks/${id}`, stock);
export const deleteStock = (id) => api.delete(`/stocks/${id}`);

export default api;
