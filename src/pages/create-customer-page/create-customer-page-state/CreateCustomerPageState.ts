import { BaseState } from '../../../base/BaseState';
import { StateEnum } from '../../../enums/StateEnum';

export class CreateCustomerPageState extends BaseState {
  copyWith({
    stateEnum,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    error?: Object | undefined;
  }): CreateCustomerPageState {
    throw new Error('Method not implemented.');
  }
}
