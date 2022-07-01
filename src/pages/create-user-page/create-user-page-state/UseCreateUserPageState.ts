import { BaseState } from '../../../base/BaseState';
import { StateEnum } from '../../../enums/StateEnum';
import { Role } from '../../role-pages/create-role-page/UserRoleForm';
export class CreateUserPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly roles: Role[] = [],
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    roles,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    error?: Object | undefined;
    roles?: Role[];
  }): CreateUserPageState {
    return new CreateUserPageState(
      stateEnum ?? this.stateEnum,
      Array.from(roles ?? this.roles),
      error
    );
  }
}
