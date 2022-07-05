import * as Yup from 'yup';

export class Role {
  private _role?: string;
  private _id?: number;

  private constructor() {}
  static fromJson(json: IGetUserRole): Role {
    const role = new Role();
    role._id = json.id;
    role._role = json.role;
    return role;
  }

  get role(): string {
    return this._role ?? 'N/A';
  }

  get id(): number {
    return this._id ?? -1;
  }

  toJson(): IGetUserRole {
    return {
      id: this.id,
      role: this.role,
    };
  }
}

export interface IGetUserRole {
  id?: number;
  role?: string;
}
export interface CreateUserRoleForm {
  role: string;
}

export const roleValidationScheam = Yup.object().shape({
  role: Yup.string()
    .required('اسم الحقل مطلوب')
    .min(3, ' اسم الحقل غير صحيح')
    .max(56, 'سم الحقل غير صحيح'),
});
