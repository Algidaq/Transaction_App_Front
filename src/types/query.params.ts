export interface ICommonQueryParams<T> {
  page?: number;
  limit?: number;
  nextPage?: number;
  currentPage?: number;
  orderBy?: keyof T;
  order?: OrderType;
}

export declare type OrderType = 'asc' | 'desc';
