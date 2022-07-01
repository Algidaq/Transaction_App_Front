import {
  Role,
  IGetUserRole,
} from '../../../pages/role-pages/create-role-page/UserRoleForm';
export class User {
  private _id?: string;
  private _name?: string;
  private _phone?: string;
  private _password?: string;
  private _createDate?: string;
  private _updateDate?: string;
  private _role!: Role;
  private constructor() {}
  static fromJson(json: Partial<IGetUser>): User {
    const user = new User();
    user._id = json.id;
    user._name = json.fullName;
    user._role = Role.fromJson({ id: json.role?.id, role: json.role?.role });
    user._updateDate = json.updateDate;
    user._phone = json.phone;
    return user;
  }
  get id(): string {
    return this._id ?? 'N/A';
  }

  get name(): string {
    return this._name ?? 'N/A';
  }

  get role(): Role {
    return this._role;
  }
  get phone(): string {
    return this._phone ?? 'N/A';
  }
}

export interface IGetUser {
  id: string;
  fullName: string;
  phone: string;
  role: { id?: number; role?: string };
  updateDate: string;
}

export interface IPostUser {
  fullName: string;
  phone: string;
  password: string;
  role: IGetUserRole;
}
