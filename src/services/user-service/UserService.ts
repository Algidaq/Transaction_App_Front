import { IPostUser, User, IGetUser } from './model/User';
import { BaseService } from '../BaseHttpService';
import { ICommonQueryParams } from '../../types/query.params';
import { IGetList } from '../../types/IGetList';
import { AxiosResponseHeaders } from 'axios';
export abstract class IUserService {
  abstract addNewUser(user: IPostUser): Promise<User>;
  abstract getUserById(id: string): Promise<User | undefined>;
  abstract getAllUsers(params: UserQueryParams): Promise<IGetList<User>>;
  abstract deleteUser(id: string): Promise<User>;
}

export class UserService extends BaseService implements IUserService {
  get route(): string {
    return '/users';
  }
  async addNewUser(user: IPostUser): Promise<User> {
    try {
      const { data } = await this.post(user);
      return User.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  getUserById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  async getAllUsers(params: UserQueryParams): Promise<IGetList<User>> {
    try {
      const { data, headers }: { data: any[]; headers: AxiosResponseHeaders } =
        await this.get(this.getDefaultQueryParams(params));
      const users = data.map((element: IGetUser) => User.fromJson(element));
      return {
        list: users,
        ...this.getPaginationHeader(headers),
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const { data } = await this.delete(id);
      return User.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  private getDefaultQueryParams(params: UserQueryParams): UserQueryParams {
    const defaultValue: UserQueryParams = {
      page: 1,
      limit: 10,
      orderBy: 'createDate',
      order: 'asc',
    };
    return { ...defaultValue, ...params };
  }
}

export interface UserQueryParams extends ICommonQueryParams<User> {
  fullname?: string;
  roleId?: string;
  phone?: string;
}
