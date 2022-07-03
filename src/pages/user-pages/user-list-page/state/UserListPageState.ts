import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { User } from '../../../../services/user-service/model/User';
import { Role } from '../../../role-pages/create-role-page/UserRoleForm';
export class UserListPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly users: User[] = [],
    public readonly showDialog: boolean = false,
    public readonly selectedUser?: User,
    public readonly roles: Role[] = [],
    public readonly selectedRole?: Role,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    users,
    showDialog,
    selectedUser,
    roles,
    selectedRole,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    users?: User[];
    showDialog?: boolean;
    selectedUser?: User;
    roles?: Role[];
    selectedRole?: Role;
    error?: Object | undefined;
  }): UserListPageState {
    return new UserListPageState(
      stateEnum ?? this.stateEnum,
      Array.from(users ?? this.users),
      showDialog ?? this.showDialog,
      selectedUser ?? this.selectedUser,
      Array.from(roles ?? this.roles),
      selectedRole ?? this.selectedRole,
      error ?? this.error
    );
  }
}
