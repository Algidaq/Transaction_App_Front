import axios from 'axios';
import { AxiosResponseHeaders } from 'axios';

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
