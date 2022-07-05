export abstract class ILocalStorageService {
  protected _tokenKey: string = 'token';
  abstract setTokenItem(token: string): void;
  abstract getTokenItem(): string | null;
  abstract removeToken(): void;
}

export class LocalStorageService extends ILocalStorageService {
  setTokenItem(token: string): void {
    localStorage.setItem(this._tokenKey, token);
  }
  getTokenItem(): string | null {
    return localStorage.getItem(this._tokenKey);
  }
  removeToken(): void {
    localStorage.removeItem(this._tokenKey);
  }
}
