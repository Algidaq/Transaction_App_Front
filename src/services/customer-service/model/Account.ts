import { Currency, IGetCurrency } from '../../currency-service/model/Currency';

export class CustomerAccount {
  private _id?: string;
  private _balance?: number;
  private _currency!: Currency;
  private _updateDate?: string;
  private _createDate?: string;
  private constructor() {}
  static fromJson(json: IGetCustomerAccount): CustomerAccount {
    const account = new CustomerAccount();
    account._id = json.id;
    account._balance = json.balance;
    account._currency = Currency.fromJson(json.currency ?? {});
    account._updateDate = json.updateDate;
    account._createDate = json.createDate;
    return account;
  }

  get id(): string {
    return this._id ?? 'N/A';
  }

  get balance(): number {
    return this._balance ?? 0.0;
  }

  get currency(): Currency {
    return this._currency;
  }

  get formattedBalance(): string {
    return this.balance.toLocaleString('en') + ` ${this.currency.symbol}`;
  }

  get createDate(): string {
    const now = new Date().toLocaleDateString('en');
    return new Date(this._createDate ?? now).toLocaleDateString();
  }
  get updateDate(): string {
    const now = new Date().toLocaleDateString('en');
    return new Date(this._updateDate ?? now).toLocaleDateString();
  }

  toPostJson(balance?: number): IPostCustomerAccount {
    return {
      currency: this.currency.toGetJson(),
      balance,
    };
  }

  toGetJson(): IGetCustomerAccount {
    return {
      id: this.id,
      balance: this.balance,
      currency: this.currency.toGetJson(),
    };
  }
}

export interface IGetCustomerAccount {
  id?: string;
  balance?: number;
  currency?: IGetCurrency;
  createDate?: string;
  updateDate?: string;
}

export interface IPostCustomerAccount {
  currency: IGetCurrency;
  balance?: number;
}
