import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Customer } from '../../../../services/customer-service/model/Customer';
import { Currency } from '../../../../services/currency-service/model/Currency';

export class GlobalTransferPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly customer?: Customer,
    public readonly currencies: Currency[] = [],
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    customer,
    currencies,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    customer?: Customer;
    currencies?: Currency[];
    error?: Object | undefined;
  }): GlobalTransferPageState {
    return new GlobalTransferPageState(
      stateEnum ?? this.stateEnum,
      customer ?? this.customer,
      Array.from(currencies ?? this.currencies),
      error ?? this.error
    );
  }
}
