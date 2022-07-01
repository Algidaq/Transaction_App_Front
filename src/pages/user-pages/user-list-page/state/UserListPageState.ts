import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { User } from '../../../../services/user-service/model/User';
export class UserListPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly users: User[] = [],
    public readonly showDialog: boolean = false,
    public readonly selectedUser?: User,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    users,
    showDialog,
    selectedUser,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    users?: User[];
    showDialog?: boolean;
    selectedUser?: User;
    error?: Object | undefined;
  }): UserListPageState {
    return new UserListPageState(
      stateEnum ?? this.stateEnum,
      Array.from(users ?? this.users),
      showDialog ?? this.showDialog,
      selectedUser ?? this.selectedUser,
      error ?? this.error
    );
  }
}
