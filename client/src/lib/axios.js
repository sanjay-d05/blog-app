import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL:'https://blog-app-q8qf.onrender.com/api',
    withCredentials:true
})
