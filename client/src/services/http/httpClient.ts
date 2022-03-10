import axios from 'axios';

const httpClient = axios.create({
    baseURL: '/app',
});

httpClient.interceptors.request.use((config) => {
    return config;
});

export default httpClient;