import { StateEnum } from '../enums/StateEnum';
export abstract class BaseState {
  constructor(
    public readonly stateEnum: StateEnum,
    public readonly error?: Object
  ) {}
  get isBusy(): boolean {
    return StateEnum.isBusy(this.stateEnum);
  }
  get isSuccess(): boolean {
    return StateEnum.isSuccess(this.stateEnum);
  }
  get isError(): boolean {
    return StateEnum.isError(this.stateEnum);
  }

  get isIdel(): boolean {
    return StateEnum.isIdel(this.stateEnum);
  }

  get isEmpty(): boolean {
    return StateEnum.isEmpty(this.stateEnum);
  }

  abstract copyWith({
    stateEnum,
    error,
  }: {
    stateEnum?: StateEnum;
    error?: Object;
  }): BaseState;
}
