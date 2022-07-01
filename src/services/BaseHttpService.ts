import axios from 'axios';

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
}
