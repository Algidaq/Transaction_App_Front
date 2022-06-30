import { BaseState } from '../../../base/BaseState';
import { StateEnum } from '../../../enums/StateEnum';
export class CreateCurrencyPageState extends BaseState {
  copyWith({
    stateEnum,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    error?: Object | undefined;
  }): CreateCurrencyPageState {
    return new CreateCurrencyPageState(
      stateEnum ?? this.stateEnum,
      error ?? this.error
    );
  }
}
