import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Customer } from '../../../../services/customer-service/model/Customer';
import { CustomerAccount } from '../../../../services/customer-service/model/Account';
import { Currency } from '../../../../services/currency-service/model/Currency';
export class GlobalTransferFormState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly customer: Customer,
    public readonly fromAccount?: CustomerAccount,
    public readonly currencies: Currency[] = [],
    public readonly toCurrency?: Currency,
    public readonly showRate: boolean = false,
    public readonly exchangeRate: number = 1,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    customer,
    fromAccount,
    currencies,
    toCurrency,
    exchangeRate,
    showRate,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    customer?: Customer;
    fromAccount?: CustomerAccount;
    currencies?: Currency[];
    toCurrency?: Currency;
    showRate?: boolean;
    exchangeRate?: number;
    error?: Object | undefined;
  }): GlobalTransferFormState {
    return new GlobalTransferFormState(
      stateEnum ?? this.stateEnum,
      customer ?? this.customer,
      fromAccount ?? this.fromAccount,
      Array.from(currencies ?? this.currencies),
      toCurrency ?? this.toCurrency,
      showRate,
      exchangeRate ?? this.exchangeRate,
      error ?? this.error
    );
  }
}
