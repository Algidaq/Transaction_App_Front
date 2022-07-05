import { BaseState } from '../../../base/BaseState';
import { StateEnum } from '../../../enums/StateEnum';
export class LoginPageState extends BaseState {
  copyWith({
    stateEnum,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    error?: Object | undefined;
  }): LoginPageState {
    return new LoginPageState(stateEnum ?? this.stateEnum, error ?? this.error);
  }
}
