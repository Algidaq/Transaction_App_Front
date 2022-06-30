export interface IPostCurrency {
  name: string;
  symbol: string;
}

export interface IGetCurrency {
  id?: number;
  name?: string;
  symbol?: string;
  createDate?: string;
  updateDate?: string;
}

export class Currency {
  private _id?: number;
  private _name?: string;
  private _sybmol?: string;
  private _createDate?: string;
  private _updateDate?: string;
  private constructor() {}

  static fromJson(json: IGetCurrency): Currency {
    const currency = new Currency();
    currency._id = json.id;
    currency._name = json.name;
    currency._sybmol = json.symbol;
    currency._createDate = json.createDate;
    currency._updateDate = json.updateDate;
    return currency;
  }
  get id(): number {
    return this._id ?? -1;
  }
  /**
   * returns name of the currency
   * @returns [string]
   */
  get name(): string {
    return this._name ?? 'N/A';
  }
  get symbol(): string {
    return this._sybmol ?? '$/A';
  }

  get createDate(): string {
    return this._createDate ?? new Date().toDateString();
  }

  get updateDate(): string {
    return this._updateDate ?? new Date().toDateString();
  }

  toGetJson(): IGetCurrency {
    return {
      id: this.id,
      name: this.name,
      symbol: this.symbol,
    };
  }
  toPostJson(): IPostCurrency {
    return {
      name: this.name,
      symbol: this.symbol,
    };
  }
}
