// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust for deployment
});

export default api;
