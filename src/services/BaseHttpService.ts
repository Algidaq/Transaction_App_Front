import axios from 'axios';
import { AxiosResponseHeaders } from 'axios';
import { LocalStorageService } from './auth-service/LocalStorage';
const storage = new LocalStorageService();
axios.interceptors.request.use((config) => {
  (config.headers as any).authorization = storage.getTokenItem() ?? '';
  return config;
});
axios.interceptors.response.use(undefined, (error: any) => {
  let status = error.response ? error.response.status : 0;
  if (status === 401 || status === 403) {
    storage.removeToken();
    window.location.href = '/login';
    console.log(window.location);
  }
  return Promise.reject(error);
});
export abstract class BaseService {
  abstract get route(): string;
  private get fullPath(): string {
    return (
      (process.env.REACT_APP_BASE_URL ?? 'http://localhost:3001/api') +
      this.route
    );
  }
  getById(id: string, params: any) {
    return axios.get(this.fullPath + `/${id}`, { params });
  }

  get(params: any) {
    return axios.get(this.fullPath, { params });
  }

  post(data: any) {
    return axios.post(this.fullPath, data);
  }

  delete(id: any) {
    return axios.delete(this.fullPath + `/${id}`);
  }

  put(id: any, body: any) {
    return axios.put(this.fullPath + `/${id}`, body);
  }

  getPaginationHeader(headers: AxiosResponseHeaders): {
    pages: number;
    count: number;
    currentPage: number;
    nextPage: number;
  } {
    return {
      pages: Number.parseInt(headers['total-pages'] ?? '1'),
      count: Number.parseInt(headers['count'] ?? '10'),
      currentPage: Number.parseInt(headers['current-page'] ?? '1'),
      nextPage: Number.parseInt(headers['next-page'] ?? '1'),
    };
  }
}
