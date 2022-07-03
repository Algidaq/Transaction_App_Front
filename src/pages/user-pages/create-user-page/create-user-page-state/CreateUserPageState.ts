import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Role } from '../../../role-pages/create-role-page/UserRoleForm';
export class CreateUserPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly formState: StateEnum,
    public readonly roles: Role[] = [],
    public readonly selectedRole?: Role,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    formState,
    roles,
    selectedRole,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    error?: Object | undefined;
    formState?: StateEnum;
    roles?: Role[];
    selectedRole?: Role;
  }): CreateUserPageState {
    return new CreateUserPageState(
      stateEnum ?? this.stateEnum,
      formState ?? this.formState,
      Array.from(roles ?? this.roles),
      selectedRole ?? this.selectedRole,
      error
    );
  }
}
