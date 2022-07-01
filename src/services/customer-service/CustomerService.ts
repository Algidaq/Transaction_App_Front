import { Customer, IPostCustomer, IGetCustomer } from './model/Customer';
import { BaseService } from '../BaseHttpService';
import { ICustomerAccountService } from './CustomerAccountService';
import { IGetList } from '../../types/IGetList';
import { ICommonQueryParams } from '../../types/query.params';
import { AxiosResponseHeaders } from 'axios';
export abstract class ICustomerService {
  abstract get accountService(): ICustomerAccountService;
  abstract addNewCustomer(customer: IPostCustomer): Promise<Customer>;
  abstract getCustomerById(id: string): Promise<Customer>;
  abstract getAllCustomers(
    params: CustomerQueryParams
  ): Promise<IGetList<Customer>>;
  abstract deleteCustomer(id: string): Promise<Customer>;
}
export class CustomerService extends BaseService implements ICustomerService {
  constructor(private _accountService: ICustomerAccountService) {
    super();
  }

  get route(): string {
    return '/customers';
  }

  get accountService(): ICustomerAccountService {
    return this._accountService;
  }

  async addNewCustomer(customer: IPostCustomer): Promise<Customer> {
    try {
      const { data }: { data: IGetCustomer } = await this.post(customer);
      return Customer.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getCustomerById(id: string): Promise<Customer> {
    try {
      const { data }: { data: IGetCustomer } = await this.getById(id, {});
      return Customer.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAllCustomers(
    params: CustomerQueryParams
  ): Promise<IGetList<Customer>> {
    try {
      const { data, headers }: { data: any[]; headers: AxiosResponseHeaders } =
        await this.get(this.getDefaultParams(params));
      const list = await data.map<Customer>((customerJson) =>
        Customer.fromJson(customerJson)
      );
      return {
        list,
        ...this.getPaginationHeader(headers),
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  private getDefaultParams(params: CustomerQueryParams): CustomerQueryParams {
    const defaultValue: CustomerQueryParams = {
      page: 1,
      limit: 10,
      orderBy: 'id',
      order: 'asc',
    };
    return {
      ...defaultValue,
      ...params,
    };
  }

  async deleteCustomer(id: string): Promise<Customer> {
    try {
      const { data } = await this.delete(id);
      return Customer.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export interface CustomerQueryParams extends ICommonQueryParams<Customer> {
  /**
   * used to search customer by is fullname
   */
  fullname?: string;
  /**
   * search customers base on phone value
   */
  phone?: string;
}
