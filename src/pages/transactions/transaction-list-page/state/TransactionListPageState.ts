import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Transaction } from '../../../../services/transaction-service/model/Transaction';
import { TransactionQueryParams } from '../../../../services/transaction-service/TransactionService';
export class TransactionListPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly transactions: Transaction[] = [],
    public readonly queryParams: TransactionQueryParams = {
      page: 1,
      limit: 10,
      currentPage: 1,
    },
    public readonly selectedTransactionType: { id: number; name: string } = {
      id: -1,
      name: 'all',
    },
    error?: Object
  ) {
    super(stateEnum, error);
  }
  get isNextDisabled(): boolean {
    return this.queryParams.currentPage === this.queryParams.nextPage;
  }
  get isPrevDisabled(): boolean {
    return this.queryParams.currentPage === 1;
  }
  copyWith({
    stateEnum,
    transactions,
    queryParams,
    selectedTransactionType,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    transactions?: Transaction[];
    queryParams?: TransactionQueryParams;
    selectedTransactionType?: { id: number; name: string };
    error?: Object | undefined;
  }): TransactionListPageState {
    return new TransactionListPageState(
      stateEnum ?? this.stateEnum,
      Array.from(transactions ?? this.transactions),
      queryParams ?? this.queryParams,
      selectedTransactionType ?? this.selectedTransactionType,
      error ?? this.error
    );
  }
}
