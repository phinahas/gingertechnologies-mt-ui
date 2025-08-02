import axios from 'axios'
import { API_URL, TOKEN_NAME } from './config/constants';

const api = axios.create({
    baseURL: `${API_URL}/api`
    
});

api.interceptors.request.use(

    (config) => {
        const token = localStorage.getItem(TOKEN_NAME)
        if (token) {
            config.headers.Authorization = JSON.parse(token)
        }
        
        config.headers['Cache-Control'] = 'no-cache';
        return config
    },
    (error) => { console.log(error) }

)



export default api;
