import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { User } from '../../../../services/user-service/model/User';
import { Role } from '../../../role-pages/create-role-page/UserRoleForm';
import { UserQueryParams } from '../../../../services/user-service/UserService';
export class UserListPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly users: User[] = [],
    public readonly showDialog: boolean = false,
    public readonly selectedUser?: User,
    public readonly roles: Role[] = [],
    public readonly selectedRole?: Role,
    public readonly queryParams: UserQueryParams = { page: 1, limit: 10 },
    error?: Object
  ) {
    super(stateEnum, error);
  }

  get isNextPageDisabled(): boolean {
    return this.queryParams.currentPage === this.queryParams.nextPage;
  }
  get isPreviousePageDisabled(): boolean {
    return this.queryParams.currentPage === 1;
  }
  copyWith({
    stateEnum,
    users,
    showDialog,
    selectedUser,
    roles,
    selectedRole,
    queryParams,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    users?: User[];
    showDialog?: boolean;
    selectedUser?: User;
    roles?: Role[];
    selectedRole?: Role;
    queryParams?: UserQueryParams;
    error?: Object | undefined;
  }): UserListPageState {
    return new UserListPageState(
      stateEnum ?? this.stateEnum,
      Array.from(users ?? this.users),
      showDialog ?? this.showDialog,
      selectedUser ?? this.selectedUser,
      Array.from(roles ?? this.roles),
      selectedRole ?? this.selectedRole,
      queryParams ?? this.queryParams,
      error ?? this.error
    );
  }
}
