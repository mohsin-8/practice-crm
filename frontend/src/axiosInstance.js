import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://practice-crm-beige.vercel.app'
});

export default axiosInstance;