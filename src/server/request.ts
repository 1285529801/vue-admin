import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/module/user";

//创建axios实例
let request = axios.create({
    // http://sph-api.atguigu.cn
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    let userStore = useUserStore()
    // 将登陆后获取并存储在user仓库中的TOKEN放入请求拦截器中
    // 随用户发的每一个请求，都会带有其TOKEN
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期"
            break;
        case 403:
            msg = '无权访问'
            break;
        case 404:
            msg = "请求地址错误"
            break;
        case 500:
            msg = "服务器出现问题"
            break;
        default:
            msg = "你干嘛嗨哟"
    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;