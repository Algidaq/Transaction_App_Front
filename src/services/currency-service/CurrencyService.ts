import { IPostCurrency, Currency } from './model/Currency';
import { BaseService } from '../BaseHttpService';
export abstract class ICurrencyService {
  abstract addNewCurrency(currency: IPostCurrency): Promise<Currency>;
  abstract getAllCurrency(): Promise<Currency[]>;
}

export class CurrencyService extends BaseService implements ICurrencyService {
  async getAllCurrency(): Promise<Currency[]> {
    try {
      const { data }: { data: any[] } = await this.get({
        page: -1,
        orderBy: 'id',
        order: 'asc',
      });
      return data.map<Currency>((json) => Currency.fromJson(json));
    } catch (e) {
      return Promise.reject(e);
    }
  }
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
