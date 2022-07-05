export interface IGetList<T> {
  list: T[];
  pages: number;
  count: number;
  queryParams: {
    pages: number;
    count: number;
    nextPage: number;
    currentPage: number;
  };
}
