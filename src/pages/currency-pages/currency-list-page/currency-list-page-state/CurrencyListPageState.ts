import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Currency } from '../../../../services/currency-service/model/Currency';

export class CurrencyListPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly currencies: Currency[] = [],
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    currencies,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    currencies?: Currency[];
    error?: Object | undefined;
  }): CurrencyListPageState {
    return new CurrencyListPageState(
      stateEnum ?? this.stateEnum,
      Array.from(currencies ?? this.currencies),
      error ?? this.error
    );
  }
}
