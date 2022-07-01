import { Customer, IPostCustomer, IGetCustomer } from './model/Customer';
import { BaseService } from '../BaseHttpService';
import { ICustomerAccountService } from './CustomerAccountService';
export abstract class ICustomerService {
  abstract get accountService(): ICustomerAccountService;
  abstract addNewCustomer(customer: IPostCustomer): Promise<Customer>;
}
export class CustomerService extends BaseService implements ICustomerService {
  constructor(private _accountService: ICustomerAccountService) {
    super();
  }
  get route(): string {
    return '/customers';
  }
  async addNewCustomer(customer: IPostCustomer): Promise<Customer> {
    try {
      const { data }: { data: IGetCustomer } = await this.post(customer);
      return Customer.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  get accountService(): ICustomerAccountService {
    return this._accountService;
  }
}
