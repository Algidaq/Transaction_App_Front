import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Customer } from '../../../../services/customer-service/model/Customer';
export class CustomerListPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly customers: Customer[] = [],
    public readonly showDialog: boolean = false,
    public readonly selectedCustomer?: Customer,
    error?: Object
  ) {
    super(stateEnum, error);
  }
  copyWith({
    stateEnum,
    customers,
    showDialog,
    selectedCustomer,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    customers?: Customer[];
    showDialog?: boolean;
    selectedCustomer?: Customer;
    error?: Object | undefined;
  }): CustomerListPageState {
    return new CustomerListPageState(
      stateEnum ?? this.stateEnum,
      Array.from(customers ?? this.customers),
      showDialog ?? this.showDialog,
      selectedCustomer ?? this.selectedCustomer,
      error ?? this.error
    );
  }
}
