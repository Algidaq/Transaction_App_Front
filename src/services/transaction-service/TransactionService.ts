import { Transaction, IGetTransaction } from './model/Transaction';
import { IPostExchangeRate } from './model/ExchangeRate';
import {
  CustomerAccount,
  IGetCustomerAccount,
} from '../customer-service/model/Account';
import { BaseService } from '../BaseHttpService';

export abstract class ITransactionService {
  abstract handleDeposite(deposite: IPostDeposite): Promise<Transaction>;
  abstract handleWithdraw(deposite: IPostDeposite): Promise<Transaction>;

  abstract getDepositeExchangeRate(
    fromAccount: CustomerAccount
  ): IPostExchangeRate;
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
  comment?: string;
}
