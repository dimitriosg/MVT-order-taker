// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: "https://order-taker-back-5416a0177bda.herokuapp.com",
});

export default api;
