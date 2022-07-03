export class GlobalTransferInfo {
  private _id?: number;
  private _name?: string;
  private _phone?: string;
  private _bankAccount?: string;
  private constructor() {}

  static fromJson(json: Partial<IGetGlobalTransferInfo>): GlobalTransferInfo {
    const transferInfo = new GlobalTransferInfo();
    transferInfo._id = json.id;
    transferInfo._name = json.fullName;
    transferInfo._phone = json.phone;
    transferInfo._bankAccount = json.bankAccount;
    return transferInfo;
  }

  get id(): number {
    return this._id ?? -1;
  }

  get name(): string {
    return this._name ?? 'N/A';
  }

  get phone(): string {
    return this._phone ?? 'N/A';
  }

  get bankAccount(): string {
    return this._bankAccount ?? 'N/A';
  }
}

export interface IGetGlobalTransferInfo {
  id: number;
  fullName: string;
  phone: string;
  bankAccount: string;
}
