import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Customer } from '../../../../services/customer-service/model/Customer';

export class DepositePageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly customer?: Customer,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    customer,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    customer?: Customer;
    error?: Object | undefined;
  }): DepositePageState {
    return new DepositePageState(
      stateEnum ?? this.stateEnum,
      customer ?? this.customer,
      error ?? this.error
    );
  }
}
