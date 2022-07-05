import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Transaction } from '../../../../services/transaction-service/model/Transaction';
export class TransactionDetailPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly transaction?: Transaction,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    transaction,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    transaction?: Transaction;
    error?: Object | undefined;
  }): TransactionDetailPageState {
    return new TransactionDetailPageState(
      stateEnum ?? this.stateEnum,
      transaction ?? this.transaction,
      error ?? this.error
    );
  }
}
