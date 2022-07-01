import { CustomerAccount, IGetCustomerAccount } from './Account';

export class Customer {
  private _id?: string;
  private _name?: string;
  private _phone?: string;
  private _accounts!: CustomerAccount[];
  private _updateDate?: string;
  private constructor() {}
  static fromJson(json: Partial<IGetCustomer>): Customer {
    const customer = new Customer();
    customer._id = json.id;
    customer._name = json.fullName;
    customer._phone = json.phone;
    customer._accounts =
      json.accounts?.map((data) => CustomerAccount.fromJson(data)) ?? [];
    customer._updateDate = json.updateDate;
    return customer;
  }

  get id(): string {
    return this._id ?? 'N/A';
  }

  get name(): string {
    return this._name ?? 'N/A';
  }

  get phone(): string {
    return this._phone ?? 'N/A';
  }

  get accounts(): CustomerAccount[] {
    return this._accounts;
  }

  get updateDate(): string {
    const now = new Date().toLocaleDateString();
    return new Date(this._updateDate ?? now).toLocaleDateString();
  }
  toGetJson(): IGetCustomer {
    return {
      id: this.id,
      fullName: this.name,
      phone: this.phone,
      accounts: this.accounts.map((acc) => acc.toGetJson()),
    };
  }
}

export interface IGetCustomer {
  id?: string;
  fullName?: string;
  phone?: string;
  accounts: IGetCustomerAccount[];
  updateDate?: string;
}

export interface IPostCustomer {
  fullName: string;
  phone: string;
}
