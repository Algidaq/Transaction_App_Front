import { IPostUser, User } from './model/User';
import { BaseService } from '../BaseHttpService';
export abstract class IUserService {
  abstract addNewUser(user: IPostUser): Promise<User>;
  abstract getUserById(id: string): Promise<User | undefined>;
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
}
