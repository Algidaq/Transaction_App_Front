import { Currency, IGetCurrency } from '../../currency-service/model/Currency';

export class ExchangeRate {
  private _id?: number;
  private _fromCurrency!: Currency;
  private _toCurrency!: Currency;
  private _rate?: number;
  private _exchangedAmount?: number;

  private constructor() {}

  static fromJson(json: Partial<IGetExchangeRate>): ExchangeRate {
    const rate = new ExchangeRate();
    rate._id = json.id;
    rate._fromCurrency = Currency.fromJson(json.fromCurrency ?? {});
    rate._toCurrency = Currency.fromJson(json.toCurrency ?? {});
    rate._rate = json.rate;
    rate._exchangedAmount = json.exchangedAmount;
    return rate;
  }

  get id(): number {
    return this._id ?? -1;
  }
  get fromCurrency(): Currency {
    return this._fromCurrency;
  }

  get toCurrency(): Currency {
    return this._toCurrency;
  }

  get rate(): number {
    return this._rate ?? -1;
  }

  get formattedRate(): string {
    return this.rate.toLocaleString('en');
  }

  get exchangedAmount(): number {
    return this._exchangedAmount ?? -1;
  }

  get formattedExchangedAmount(): string {
    return this.exchangedAmount.toLocaleString('en');
  }
}

export interface IGetExchangeRate {
  id: number;
  fromCurrency: IGetCurrency;
  toCurrency: IGetCurrency;
  rate: number;
  exchangedAmount: number;
}

export interface IPostExchangeRate {
  fromCurrency?: IGetCurrency;
  toCurrency: IGetCurrency;
  rate: number;
}
