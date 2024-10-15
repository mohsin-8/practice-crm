import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'https://practice-crm-server.vercel.app',
});

export default axiosInstance;