import axios, { type AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
