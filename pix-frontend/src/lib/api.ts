import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Endereço do Micronaut
    headers: {
        'Content-Type': 'application/json',
    },
});