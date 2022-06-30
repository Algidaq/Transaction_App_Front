import { IPostCurrency, Currency } from './model/Currency';
import { BaseService } from '../BaseHttpService';
export abstract class ICurrencyService {
  abstract addNewCurrency(currency: IPostCurrency): Promise<Currency>;
}

export class CurrencyService extends BaseService implements ICurrencyService {
  get route(): string {
    return '/currencies';
  }
  async addNewCurrency(currency: IPostCurrency): Promise<Currency> {
    try {
      const { data } = await this.post(currency);
      return Currency.fromJson(data);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
