import axios from 'axios';

const api = axios.create({
    baseURL: 'https://desafio-digivox.herokuapp.com', 
});

export default api;