import {
  IGetCustomerAccount,
  IPostCustomerAccount,
  CustomerAccount,
} from './model/Account';
import { BaseService } from '../BaseHttpService';
export abstract class ICustomerAccountService {
  abstract addNewAccount(
    customerId: string,
    account: IPostCustomerAccount
  ): Promise<CustomerAccount>;
}

export class CustomerAccountService
  extends BaseService
  implements ICustomerAccountService
{
  private _route?: string;
  get route(): string {
    return this._route ?? '/customers';
  }
  set route(customerId: string) {
    this._route = `/customers/${customerId}/accounts`;
  }

  async addNewAccount(
    customerId: string,
    account: IPostCustomerAccount
  ): Promise<CustomerAccount> {
    try {
      this.route = customerId;
      const { data }: { data: IGetCustomerAccount } = await this.post(account);
      return CustomerAccount.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
