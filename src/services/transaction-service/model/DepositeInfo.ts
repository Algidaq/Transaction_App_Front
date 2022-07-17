export class DepositeInfo {
  private _id?: number;
  private _from?: string;
  private constructor() {}
  static fromJson(json: Partial<IGetDepositeInfo>): DepositeInfo {
    const info = new DepositeInfo();
    info._id = json.id;
    info._from = json.from;
    return info;
  }
  get id(): number {
    return this._id ?? -1;
  }

  get from(): string {
    return this._from ?? 'N/A';
  }
}

export interface IGetDepositeInfo {
  id: number;
  from: string;
}
