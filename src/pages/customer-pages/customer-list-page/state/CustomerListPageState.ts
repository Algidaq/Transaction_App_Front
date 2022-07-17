import { BaseState } from '../../../../base/BaseState';
import { StateEnum } from '../../../../enums/StateEnum';
import { Customer } from '../../../../services/customer-service/model/Customer';
import { CustomerQueryParams } from '../../../../services/customer-service/CustomerService';
export class CustomerListPageState extends BaseState {
  constructor(
    stateEnum: StateEnum,
    public readonly customers: Customer[] = [],
    public readonly showDialog: boolean = false,
    public readonly selectedCustomer?: Customer,
    public readonly queryParams: CustomerQueryParams = {
      page: 1,
      limit: 1,
      currentPage: 1,
    },
    public readonly showStatementDialog = false,
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
    customers,
    showDialog,
    selectedCustomer,
    queryParams,
    showStatementDialog,
    error,
  }: {
    stateEnum?: StateEnum | undefined;
    customers?: Customer[];
    showDialog?: boolean;
    selectedCustomer?: Customer;
    queryParams?: CustomerQueryParams;
    showStatementDialog?: boolean;
    error?: Object | undefined;
  }): CustomerListPageState {
    return new CustomerListPageState(
      stateEnum ?? this.stateEnum,
      Array.from(customers ?? this.customers),
      showDialog ?? this.showDialog,
      selectedCustomer ?? this.selectedCustomer,
      queryParams ?? this.queryParams,
      showStatementDialog ?? this.showStatementDialog,
      error ?? this.error
    );
  }
}
