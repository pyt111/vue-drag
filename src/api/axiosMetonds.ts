import axios from "axios";
import store from "../store";
import vue from "vue";
// import {
//   Message
// } from 'element-ui';
// console.log(MessageBox);
const qs = require("qs");
import { BASE_API } from "@/api/url.ts";
// import { decrypt } from 'utils/allFuns';//自定义非vue公共方法 decrypt--aes解密
// import router from '../router';
// console.log(process.env);
// 创建axios实例
const service = axios.create({
    baseURL: BASE_API, // api的process.env.BASE_API
    timeout: 30000, // 请求超时时间
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
    // responseType: "json",
    // withCredentials: true, // 是否允许带cookie这些
});

function getQueryVariable(url: string, variable: any) {
    let str = url.split("?");
    let vars = str[1].split("&");
    //   console.log(vars);
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return "";
}

// request拦截器
// axios.defaults.timeout = 3000;
service.interceptors.request.use(
    config => {
        if (config.method === "post") {
          
            let data = qs.parse(config.data);
            let pickingLineId = store.state.code.pickingLineId || "W3100020616" ;
            // console.log(pickingLineId);
            config.data = qs.stringify({
                // userCode: "",
                pickingLineId: pickingLineId,
                door: "door",
                ...data
            });
        }else if (config.method === 'get') {
            let pickingLineId = store.state.code.pickingLineId || "W3100020616" ;
            config.params = {
                pickingLineId: pickingLineId,
                door: "door",
              ...config.params
            }
          } // Do something before request is sent
        if (store.getters.token) {
            config.headers["X-Token"] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
            // config.headers.Authorization = store.getters.token;
        }
        // config.data = JSON.stringify(config.data);
        // console.log(config.data);
        //   config.headers = {
        //     'Cookie' : 'shiro.sesssion=06b21f07-7b78-4d26-b4bf-96b04aefb085'
        //   }
        config.headers = {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        };
        //   console.log(config);
        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        //   console.log(response);
        return response;
    },
    error => {
        if (error && error.response) {
            //   console.log(error.response);

            switch (error.response.status) {
                case 400:
                    error.message = "错误请求";
                    break;
                case 401:
                    error.message = "未授权，请重新登录";
                    break;
                case 403:
                    error.message = "拒绝访问";
                    break;
                case 404:
                    error.message = "请求错误,未找到该资源";
                    break;
                case 405:
                    error.message = "请求方法未允许";
                    break;
                case 408:
                    error.message = "请求超时";
                    break;
                case 500:
                    error.message = "服务器端出错";
                    break;
                case 501:
                    error.message = "网络未实现";
                    break;
                case 502:
                    error.message = "网络错误";
                    break;
                case 503:
                    error.message = "服务不可用";
                    break;
                case 504:
                    error.message = "网络超时";
                    break;
                case 505:
                    error.message = "http版本不支持该请求";
                    break;
                default:
                //   error.message = `连接错误${err.response.status}`
            }
            //   console.log(error.message,'5555555555555555');
        } else {
            error.message = "连接到服务器失败";
        }

        // console.log('err' + error); // for debug

        return Promise.reject(error);
    }
);

//get请求
export const get = (url: string, param: any) => {
    return new Promise((resolve, reject) => {
        service({
            method: "get",
            url,
            params: param
        }).then(res => {
            // console.log(res,'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
            if (res.data != "") {
                //判断返回数据是否加密 如果加密则数据为字符串
                if (res.data.statusCode == 200) {
                    // setTimeout(() => resolve(res.data), 5000);
                    //   console.log('11111111111111111111111111111111111111111111111111111');
                    resolve(res.data);
                } else {
                    console.log(res,'----------error----------');
                    let err = {
                        url: res.config.url,
                        // data: res.config.data,
                        msg: res.data.message
                    };
                    reject(err);
                }
            } else if (typeof res.data == "string" && res.data != "") {

            } else if (typeof res.data == "string") {
                //   console.log('sssssssssssssssssssss');
                let err = {
                    message: "服务器响应失败"
                };
                reject(err);
            }
        }).catch(err => {
                // console.log('eqqqqqqqqqeeeeeeeeeeee');
                // setTimeout(() => resolve(err + 200), 5000);
                reject(err);
            });;
    });
};
//post请求
export const post = (url: any, data: any) => {
    // console.log(data);
    //     let userCode = getQueryVariable('userId');
    //   let sessionId = getQueryVariable('sessionId');
    let datas = data || {};

    //   datas.userCode = userCode;
    //   datas.sessionId = sessionId;
    return new Promise((resolve, reject) => {
        service({
            method: "post",
            url,
            data: qs.stringify(datas)
        })
            .then(res => {
                // console.log(res,'ssssssssssssss');
                //   console.log(typeof (res.data));
                // console.log(typeof (res.data));
                if (res.data != "") {
                    //判断返回数据是否加密 如果加密则数据为字符串
                    if (res.data.statusCode == 200) {
                        // setTimeout(() => resolve(res.data), 5000);
                        //   console.log('11111111111111111111111111111111111111111111111111111');
                        resolve(res.data);
                    } else {
                        // console.log(res,'----------error----------');
                        let err = {
                            url: res.config.url,
                            // data: res.config.data,
                            msg: res.data.message
                        };
                        reject(err);
                    }
                } else if (typeof res.data == "string" && res.data != "") {
                    //   console.log('22222223333333333333');
                    // let decryData = decrypt(res.data)
                    // if (res.code == 200) {
                    // resolve(res.data)
                    // }else{
                    // console.log(res);
                    // reject(res.data)
                    // }
                } else if (typeof res.data == "string") {
                    //   console.log('sssssssssssssssssssss');
                    let err = {
                        message: "服务器响应失败"
                    };
                    reject(err);
                }
            })
            .catch(err => {
                // console.log('eqqqqqqqqqeeeeeeeeeeee');
                // setTimeout(() => resolve(err + 200), 5000);
                reject(err);
            });
    });
};
