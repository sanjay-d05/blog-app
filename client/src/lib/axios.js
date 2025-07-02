import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL:'https://blog-app-server-vd82.onrender.com/api',
    withCredentials:true
});
