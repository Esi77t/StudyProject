import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:10000',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');

        if(token) {
            config.headers['Authorization'] = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;