import { BaseState } from '../../../base/BaseState';
import { StateEnum } from '../../../enums/StateEnum';
import { Transaction } from '../../../services/transaction-service/model/Transaction';
import { Customer } from '../../../services/customer-service/model/Customer';
export class PrintPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly transactions: Transaction[] = [],
    public readonly customer?: Customer,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    transactions,
    customer,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    error?: Object | undefined;
    transactions?: Transaction[];
    customer?: Customer;
  }): PrintPageState {
    return new PrintPageState(
      stateEnum ?? this.stateEnum,
      Array.from(transactions ?? this.transactions),
      customer ?? this.customer,
      error ?? this.error
    );
  }
}
