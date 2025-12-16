import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
    baseURL: "/api", // Mock server base URL
    timeout: 5000,
});

// Request interceptor
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Add token if needed
        // if (store.getters.token) {
        //   config.headers['Authorization'] = getToken()
        // }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response interceptor
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data;
        // Assuming standard API response format: { code: 200, data: ..., message: '' }
        if (res.code !== 200) {
            ElMessage({
                message: res.message || "Error",
                type: "error",
                duration: 5 * 1000,
            });
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            return res.data;
        }
    },
    (error: any) => {
        console.log("err" + error);
        ElMessage({
            message: error.message,
            type: "error",
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    }
);

export default service;
