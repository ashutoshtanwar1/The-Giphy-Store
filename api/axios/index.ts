import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const api = axios.create({
  baseURL: 'https://api.giphy.com/v1/',
});

const api_key = 'FSPfNME2Zi5hVag5o7doCw8G9gtyVJGL';

api.interceptors.request.use(
  (config: AxiosRequestConfig<any>): AxiosRequestConfig<any> => {
    config.url = `${config.url}&api_key=${api_key}&`;
    return config;
  },
  (err: TypeError) => {
    return Promise.reject(err);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    }
  },
  (error: TypeError) => {
    return Promise.reject(error);
  },
);

export default api;
