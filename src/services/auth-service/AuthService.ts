import { User } from '../user-service/model/User';
import { BaseService } from '../BaseHttpService';
import jwtDecode from 'jwt-decode';
import { ILocalStorageService } from './LocalStorage';

export abstract class IAuthService {
  abstract login(phone: string, password: string): Promise<User>;
  abstract logout(): boolean;
  abstract get isLoggedIn(): boolean;
}

export class AuthService extends BaseService implements IAuthService {
  constructor(public readonly storage: ILocalStorageService) {
    super();
  }
  get isLoggedIn(): boolean {
    try {
      const token = this.storage.getTokenItem() ?? '';
      if (token === '') return false;
      jwtDecode(token.split(' ')[1]);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  get route(): string {
    return '/auth';
  }
  async login(phone: string, password: string): Promise<User> {
    try {
      const { data }: { data: IGetAuth } = await this.post({ phone, password });
      const token = data.token.split(' ')[1] ?? '';
      this.storage.setTokenItem(data.token);
      const json: any = jwtDecode(token);
      return User.fromJson(json ?? {});
    } catch (e) {
      return Promise.reject(e);
    }
  }
  logout(): boolean {
    this.storage.removeToken();
    return true;
  }
}

export interface IGetAuth {
  token: string;
}
