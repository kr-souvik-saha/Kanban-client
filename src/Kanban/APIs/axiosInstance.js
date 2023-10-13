import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'content-type': 'application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('token');

    if (token) {
        if (config.headers) {
            config.headers.Cookies = {
                token
            }
        }
    }
    return config;

}, (error) => {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
})

export default axiosInstance;