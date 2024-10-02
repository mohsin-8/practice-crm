import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://practice-crm-ashen.vercel.app'
});

export default axiosInstance;