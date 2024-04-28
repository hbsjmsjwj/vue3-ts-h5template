import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, } from 'axios';
import { axiosConfig } from '@/config/index';
import { AxiosCanceler } from './helper/index';
import {  showFailToast } from 'vant';
import router from '@/router';
import { useUserStore } from '@/store/user';
import { ResultData,CustomAxiosRequestConfig } from './interface/index';
const axiosCanceler = new AxiosCanceler();
class HttpRequest {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /**
     * 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: any) => {
        const userStore = useUserStore();
        if (userStore.token) config.headers.set('Authorization', userStore.token);
        config.cancel ?? (config.cancel = true);
        config.cancel && axiosCanceler.addPending(config);

        return config;
      },
      (err: AxiosError) => {
        return Promise.resolve(err);
      },
    );
    /**
     * 响应拦截器
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
        axiosCanceler.removePending(response.config);
        const { data } = response;
        if (data?.code === 200) {
          return data;
        }
        if (data?.message) {
          showFailToast(data.message);
        }

        // if (data?.code === 401) router.replace('/401');

        return response;
      },
      async (error: AxiosError) => {
        switch (error.response?.status) {
          case 400:
            showFailToast('请求错误');
            break;
          case 401:
            showFailToast('未授权，请重新登录');
            router.replace('/401');
            break;
          case 403:
            showFailToast('拒绝访问');
            break;
          case 404:
            showFailToast('请求出错');
            router.replace('/404');
            break;
          case 408:
            showFailToast('请求超时');
            break;
        }
        if (error.message.indexOf('timeout') !== -1) showFailToast('请求超时！请您稍后重试');
        if (error.message.indexOf('Network Error') !== -1) showFailToast('网络错误！请您稍后重试');
        if (!window.navigator.onLine) router.replace('/500');

        return Promise.resolve(error);
      },
    );
  }
  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' });
  }
}

export default new HttpRequest(axiosConfig);
