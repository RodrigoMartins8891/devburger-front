import axios from 'axios';

export const api = axios.create({
    // Substituído localhost pela URL real do Back4App
    baseURL: 'https://devburgerback-uasag41r.b4a.run',
});

// 🔐 INTERCEPTOR — AQUI (Mantém igual)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});