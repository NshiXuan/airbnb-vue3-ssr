// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// const defaultsConfig = {
//   // baseURL: import.meta.env.DEV
//   //   ? 'http://localhost:9000/proxy'
//   //   : 'http://110.42.184.111',
//   baseURL: 'http://110.42.184.111',
//   timeout: 5000
// };

// class Http {
//   constructor() {
//     this.httpInterceptorsRequest();
//     this.httpInterceptorsResponse();
//   }

//   private static axiosInstance = axios.create(defaultsConfig);

//   // 请求拦截
//   // Add a request interceptor
//   private httpInterceptorsRequest() {
//     Http.axiosInstance.interceptors.request.use(
//       (config: AxiosRequestConfig) => {
//         // Do something before request is sent
//         return config;
//       },
//       (error) => {
//         // Do something with request error
//         return Promise.reject(error);
//       }
//     );
//   }

//   // 响应拦截
//   // Add a response interceptor
//   private httpInterceptorsResponse() {
//     Http.axiosInstance.interceptors.response.use(
//       (response: AxiosResponse) => {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         return response;
//       },
//       (error) => {
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         return Promise.reject(error);
//       }
//     );
//   }

//   public async get(url: string, config?: AxiosRequestConfig) {
//     const response = await Http.axiosInstance.get(url, config);
//     return response.data;
//   }

//   public async post(url: string, config: AxiosRequestConfig) {
//     const response = await Http.axiosInstance.post(url, config);
//     return response.data;
//   }
// }

// export const http = new Http();

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const defaultConfig = {
  timeout: 5000,
  baseURL: 'http://110.42.184.111'
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance = axios.create(defaultConfig)

  // 请求拦截
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    }, err => {
      return Promise.reject(err)
    })
  }

  // 响应拦截
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      return res
    }, err => {
      return Promise.reject(err)
    })
  }

  // 封装请求 axios返回类型为Promise且接收一个泛型
  public async get<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    const res = await Http.axiosInstance.get(url, { params })
    return res.data
  }

  public async post<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    const res = await Http.axiosInstance.post(url, params)
    return res.data
  }
}

export const http = new Http()