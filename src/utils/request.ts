import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, data, message: msg } = response.data;

    if (code === 0 || code === 200) {
      return data;
    } else {
      message.error(msg || '请求失败');
      return Promise.reject(new Error(msg || '请求失败'));
    }
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      const msg = data?.message || '服务器异常';

      if (data.code === 401) {
        message.error('请先登录');
      } else if (data.code === 400) {
        message.error(Array.isArray(msg) ? msg.join('；') : msg);
      } else {
        message.error(msg);
      }

      return Promise.reject(new Error(msg));
    } else {
      message.error('网络连接失败');
      return Promise.reject(new Error('网络连接失败'));
    }
  }
);

// ✅ 关键：泛型函数名必须匹配 orval config 中的 `name: 'request'`
export const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return service.request(config).then((res) => res as unknown as T);
};
