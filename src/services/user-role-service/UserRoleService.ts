import {
  CreateUserRoleForm,
  Role,
} from '../../pages/create-role-page/UserRoleForm';
import { BaseService } from '../BaseHttpService';

export abstract class IUserRoleService {
  abstract createUserRole(body: CreateUserRoleForm): Promise<Role>;
  abstract getRoleById(id: string): Promise<Role | undefined>;
  abstract getAllRoles(): Promise<Role[]>;
}

export class UserRoleService extends BaseService implements IUserRoleService {
  get route(): string {
    return '/roles';
  }
  async createUserRole(body: CreateUserRoleForm): Promise<Role> {
    try {
      const { data } = await this.post({ role: body.role });
      return Role.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  getRoleById(id: string): Promise<Role | undefined> {
    throw new Error('Method not implemented.');
  }
  async getAllRoles(): Promise<Role[]> {
    try {
      const { data }: { data: any[] } = await this.get({});
      return data.map<Role>((json) => Role.fromJson(json));
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
