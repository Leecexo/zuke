// 封装axios

import { Toast } from 'antd-mobile'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8086/'
// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        if (config.url !== 'user/login' && config.url !== 'homes/swipe') {
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers["Authorization"] = AUTH_TOKEN;
            // return config
        }
        // 在发送请求之前做些什么
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        const {
            meta: {
                status,
                msg
            }
        } = response.data;
        if (status !== 200 && status !== 201) {
            Toast.fail(msg, 1);
        }
        return response
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

export default axios
