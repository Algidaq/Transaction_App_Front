export enum StateEnum {
  busy,
  idel,
  success,
  error,
  empty,
}

export namespace StateEnum {
  export function isBusy(state: StateEnum): boolean {
    return state === StateEnum.busy;
  }
  export function isIdel(state: StateEnum): boolean {
    return state === StateEnum.idel;
  }
  export function isError(state: StateEnum): boolean {
    return state === StateEnum.error;
  }
  export function isEmpty(state: StateEnum): boolean {
    return state === StateEnum.empty;
  }
  export function isSuccess(state: StateEnum): boolean {
    return state === StateEnum.success;
  }
}
