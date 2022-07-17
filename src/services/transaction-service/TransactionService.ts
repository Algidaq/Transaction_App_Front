import { Transaction, IGetTransaction } from './model/Transaction';
import { IPostExchangeRate } from './model/ExchangeRate';
import {
  CustomerAccount,
  IGetCustomerAccount,
} from '../customer-service/model/Account';
import { BaseService } from '../BaseHttpService';
import { ICommonQueryParams } from '../../types/query.params';
import { AxiosResponseHeaders } from 'axios';
import { IGetList } from '../../types/IGetList';

import { IGetCustomer, Customer } from '../customer-service/model/Customer';

export abstract class ITransactionService {
  abstract handleDeposite(deposite: IPostDeposite): Promise<Transaction>;
  abstract handleWithdraw(deposite: IPostDeposite): Promise<Transaction>;
  abstract handleGlobalTransfer(
    body: IPostGlobalTransfer
  ): Promise<Transaction>;

  abstract getAllTransactions(
    params: TransactionQueryParams
  ): Promise<IGetList<Transaction>>;
  abstract getDepositeExchangeRate(
    fromAccount: CustomerAccount
  ): IPostExchangeRate;

  abstract getTransactionById(id: string): Promise<Transaction>;
  abstract getCustomerTransactionStatement(
    body: IGetCustomerStatement
  ): Promise<ITransactionStatement>;
}

export class TransactionService
  extends BaseService
  implements ITransactionService
{
  private _route?: string;

  set route(value: string) {
    this._route = value;
  }
  get route(): string {
    return '/transactions' + (this._route ?? '');
  }
  async getCustomerTransactionStatement(
    body: IGetCustomerStatement
  ): Promise<ITransactionStatement> {
    this.route = '/print';
    try {
      const {
        data,
      }: { data: { customer: IGetCustomer; transactions: IGetTransaction[] } } =
        await this.post(body);
      return {
        customer: Customer.fromJson(data.customer),
        transactions: data.transactions.map<Transaction>((value) =>
          Transaction.fromJson(value)
        ),
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getAllTransactions(
    params: TransactionQueryParams
  ): Promise<IGetList<Transaction>> {
    this.route = '';
    try {
      const { data, headers }: { data: any[]; headers: AxiosResponseHeaders } =
        await this.get(params);
      const list = data.map<Transaction>((element) =>
        Transaction.fromJson(element)
      );
      const { pages, count } = this.getPaginationHeader(headers);
      return {
        list,
        pages,
        count,
        queryParams: { ...this.getPaginationHeader(headers) },
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getTransactionById(id: string): Promise<Transaction> {
    try {
      const { data }: { data: IGetTransaction } = await this.getById(id, {});
      return Transaction.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async handleDeposite(deposite: IPostDeposite): Promise<Transaction> {
    this.route = '/deposite';
    try {
      const exchangeRate = this.getDepositeExchangeRate(deposite.fromAccount);
      const body = {
        ...deposite,
        exchangeRate,
      };
      const { data }: { data: IGetTransaction } = await this.post(body);
      return Transaction.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async handleWithdraw(deposite: IPostDeposite): Promise<Transaction> {
    this.route = '/withdraw';
    try {
      const exchangeRate = this.getDepositeExchangeRate(deposite.fromAccount);
      const body = {
        ...deposite,
        exchangeRate,
      };
      const { data }: { data: IGetTransaction } = await this.post(body);
      return Transaction.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async handleGlobalTransfer(body: IPostGlobalTransfer): Promise<Transaction> {
    try {
      this.route = '/global-transfer';
      const { data }: { data: IGetTransaction } = await this.post(body);
      return Transaction.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  getDepositeExchangeRate(fromAccount: IGetCustomerAccount): IPostExchangeRate {
    return {
      rate: 1,
      toCurrency: fromAccount.currency!,
    };
  }
}

export interface IPostDeposite {
  amount: number;
  customer: IGetCustomerAccount;
  fromAccount: IGetCustomerAccount;
  from?: string;
  comment?: string;
}

export interface IPostGlobalTransfer extends IPostDeposite {
  transactionInfo: IPostGlobalTransferInfo;
  exchangeRate: IPostExchangeRate;
}

export interface IPostGlobalTransferInfo {
  fullName: string;
  phone?: string;
  bankAccount?: string;
}

export interface TransactionQueryParams
  extends ICommonQueryParams<Transaction> {
  /**
   * filter transactions by customerId
   */
  customerId?: string;
  /**
   * filter transactions by specific customer account
   */
  accountId?: string;
  /**
   * filter transaction by specific date
   */
  /**
   * filter by customer name
   */
  fullName?: string;
  /**
   * filter by phone number
   */
  phone?: string;
  date?: string;

  /**
   * filter by transaction type [``deposite``,``withdraw``,``localTransfer``,``globalTransfer``]
   */
  type?: string;
}

export interface IGetCustomerStatement {
  customerId: string;
  fromDate: string;
  toDate: string;
}

export interface ITransactionStatement {
  customer: Customer;
  transactions: Transaction[];
}
