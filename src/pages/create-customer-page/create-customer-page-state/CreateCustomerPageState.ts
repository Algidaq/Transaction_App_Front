import { BaseState } from '../../../base/BaseState';
import { StateEnum } from '../../../enums/StateEnum';
import { Currency } from '../../../services/currency-service/model/Currency';

export class CreateCustomerPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly currencyState: StateEnum,
    public readonly currencies: Currency[] = [],
    error?: object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    currencies,
    currencyState,
    error,
  }: {
    currencies?: Currency[];
    currencyState?: StateEnum;
    stateEnum?: StateEnum | undefined;
    error?: Object | undefined;
  }): CreateCustomerPageState {
    return new CreateCustomerPageState(
      stateEnum ?? this.stateEnum,
      currencyState ?? this.currencyState,
      Array.from(currencies ?? this.currencies),
      error ?? this.error
    );
  }
}
