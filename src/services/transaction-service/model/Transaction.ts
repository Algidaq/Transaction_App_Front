import { Customer, IGetCustomer } from '../../customer-service/model/Customer';
import {
  CustomerAccount,
  IGetCustomerAccount,
} from '../../customer-service/model/Account';
import { TransactionType } from '../../../types/TransactionType';
import { IGetExchangeRate, ExchangeRate } from './ExchangeRate';
import {
  GlobalTransferInfo,
  IGetGlobalTransferInfo,
} from './GlobalTransactionInfo';

export class Transaction {
  private _id?: string;
  private _date?: string;
  private _customer!: Customer;
  private _fromAccount!: CustomerAccount;
  private _type!: TransactionType;
  private _amount?: number;
  private _balanceSnapshot?: number;
  private _exchangeRate!: ExchangeRate;
  private _transactionInfo!: GlobalTransferInfo;
  private _comment?: string;
  private constructor() {}
  static fromJson(json: Partial<IGetTransaction>): Transaction {
    const tran = new Transaction();
    tran._id = json.id;
    tran._date = json.date;
    tran._customer = Customer.fromJson(json.customer ?? {});
    tran._fromAccount = CustomerAccount.fromJson(json.fromAccount ?? {});
    tran._type = json.type ?? 'deposite';
    tran._amount = json.amount;
    tran._balanceSnapshot = json.balanceSnapShot;
    tran._exchangeRate = ExchangeRate.fromJson(json.exchangeRate ?? {});
    tran._transactionInfo = GlobalTransferInfo.fromJson(
      json.transactionInfo ?? {}
    );
    tran._comment = json.comment;
    return tran;
  }

  get id(): string {
    return this._id ?? 'N/A';
  }

  get date(): string {
    const now = new Date().toLocaleDateString('en');
    return new Date(this._date ?? now).toLocaleDateString('en');
  }

  get fromCustomer(): Customer {
    return this._customer;
  }

  get fromAccount(): CustomerAccount {
    return this._fromAccount;
  }

  get type(): TransactionType {
    return this._type;
  }

  get amount(): number {
    return this._amount ?? -1;
  }

  get formattedAmount(): string {
    return (
      this.amount.toLocaleString('en') + ' ' + this.fromAccount.currency.symbol
    );
  }

  get balanceSnapshot(): number {
    return this._balanceSnapshot ?? -1;
  }

  get formattedSnapshot(): string {
    return (
      this.balanceSnapshot.toLocaleString('en') +
      ' ' +
      this.fromAccount.currency.symbol
    );
  }

  get exchangeRate(): ExchangeRate {
    return this._exchangeRate;
  }
  get transactionInfo(): GlobalTransferInfo {
    return this._transactionInfo;
  }

  get transactionTypeName(): string {
    switch (this.type) {
      case 'deposite':
        return 'إيداع';
      case 'withdraw':
        return 'سحب/خصم';
      case 'globalTransfer':
        return 'نحويل';
      case 'localeTransfer':
        return 'Locale Transfer';
      default:
        return 'Unknown';
    }
  }
  get comment(): string {
    return this._comment ?? 'N/A';
  }
}

export interface IGetTransaction {
  id: string;
  date: string;
  customer: IGetCustomer;
  fromAccount: IGetCustomerAccount;
  type: TransactionType;
  amount: number;
  balanceSnapShot: number;
  exchangeRate: IGetExchangeRate;
  transactionInfo: IGetGlobalTransferInfo;
  comment: string;
}
