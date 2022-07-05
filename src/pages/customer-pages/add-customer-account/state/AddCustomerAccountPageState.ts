import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Customer } from '../../../../services/customer-service/model/Customer';
import { Currency } from '../../../../services/currency-service/model/Currency';
export class AddCustomerAccountPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly formState: StateEnum,
    public readonly customer?: Customer,
    public readonly currencies: Currency[] = [],
    public readonly selectedCurrency?: Currency,
    public readonly isButtonDisabled: boolean = true,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    formState,
    customer,
    currencies,
    selectedCurrency,
    isButtonDisabled,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    formState?: StateEnum;
    customer?: Customer;
    currencies?: Currency[];
    selectedCurrency?: Currency;
    isButtonDisabled?: boolean;
    error?: Object | undefined;
  }): AddCustomerAccountPageState {
    return new AddCustomerAccountPageState(
      stateEnum ?? this.stateEnum,
      formState ?? this.formState,
      customer ?? this.customer,
      Array.from(currencies ?? this.currencies),
      selectedCurrency ?? this.selectedCurrency,
      isButtonDisabled,
      error ?? this.error
    );
  }
}
