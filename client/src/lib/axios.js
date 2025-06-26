import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL:'https://blog-app-server-14cn.onrender.com/api',
    withCredentials:true
})
