import axios from 'axios'
import qs from 'qs'
import { getToken } from '@/utils/auth.js'
import { Loading } from 'element-ui'
const service = axios.create({
    // baseURL: 'http://h1ed3c0v49.52http.net', // api的base_url
    baseURL: 'http://j.api.zyd.nbmade2025.com/japi/2_1', // api的base_url
    timeout: 500000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    config.headers["content-type"] = "application/x-www-form-urlencoded"
    config.isForm && (config.headers["token"] = getToken())
    config.isFile && (config.headers["content-type"] = config.isFile)
    // config.isFile && (config.headers["content-type"] = "multipart/form-data")
    return config
}, error => {
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function jPost(url, params = {}, isForm = true, isFile = false) {
    return new Promise((resolve, reject) => {
        let loadingInstance = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        service({
            url,
            method: 'post',
            data: isFile ? params : qs.stringify(params),
            isForm,
            isFile
        }).then(response => {
            loadingInstance.close()
            resolve(response)
        }).catch(error => {
            loadingInstance.close()
            reject(error)
        })
    })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function jGet(url, params = {}, isForm = false) {
    return new Promise((resolve, reject) => {
        service({
            url,
            method: 'get',
            params: params,
            isForm
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}