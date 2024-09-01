// src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
    timeout: 10000,
});

export default axiosInstance;
