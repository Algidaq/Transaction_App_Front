import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Role } from '../../create-role-page/UserRoleForm';

export class RoleListPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly roles: Role[] = [],
    public readonly showDialog: boolean = false,
    public readonly selectedRole?: Role,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    roles,
    showDialog,
    selectedRole,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    roles?: Role[];
    showDialog?: boolean;
    selectedRole?: Role;
    error?: Object | undefined;
  }): RoleListPageState {
    return new RoleListPageState(
      stateEnum ?? this.stateEnum,
      Array.from(roles ?? this.roles),
      showDialog ?? this.showDialog,
      selectedRole ?? this.selectedRole,
      error ?? this.error
    );
  }
}
