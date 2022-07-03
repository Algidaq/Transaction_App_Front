export interface Column<T> {
  header: string;
  key: keyof T;
  columnStyle?: React.CSSProperties;
  isComputed?: boolean;
  isRenderable?: boolean;
  compute?: (value: T) => string;
  render?: (value: T) => React.ReactElement;
  cellClassNames?: string[];
}
