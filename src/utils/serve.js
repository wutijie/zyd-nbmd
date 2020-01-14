import axios from 'axios'
const service = axios.create({
    baseURL: 'http://139.196.44.140:8888', // api的base_url
    timeout: 500000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    config.isForm ?
        config.headers["content-type"] = "application/x-www-form-urlencoded" :
        config.headers["content-type"] = "application/json"
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
export function post(url, params = {}, isForm = false) {
    return new Promise((resolve, reject) => {
        service({
            url,
            method: 'post',
            data: params,
            isForm
        }).then(response => {
            resolve(response)
        }).catch(error => {
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
export function get(url, params = {}, isForm = false) {
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