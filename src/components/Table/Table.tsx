import React from 'react';
import { Column } from './model/Column';
import { FunctionComponent } from 'react';
export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: Column<any>[];
  rows: any[];
  isFullWidth?: boolean;
}

const Table: React.FunctionComponent<TableProps> = ({
  columns,
  rows,
  isFullWidth = true,
}) => {
  const classes = isFullWidth ? 'is-fullwidth' : '';
  return (
    <div
      className="table-container is-fullwidth"
      style={{ borderRadius: '0px 8px' }}
    >
      <table className={`table is-hoverable ${classes}`}>
        <TableHeader columns={columns} />
        <TableBody columns={columns} rows={rows} />
      </table>
    </div>
  );
};

interface TableHeaderProps {
  columns: Column<any>[];
}

const TableHeader: FunctionComponent<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index} abbr={column.header} style={column.columnStyle}>
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

interface TableBodyProps {
  rows: any[];
  columns: Column<any>[];
}

const TableBody: FunctionComponent<TableBodyProps> = ({ columns, rows }) => {
  const render = (row: any, column: Column<any>) => {
    if (column.isComputed && column.compute) {
      return <div className="column">{column.compute(row)}</div>;
    } else if (column.isRenderable && column.render) {
      return column.render(row);
    } else {
      return <div className="column">{row[column.key] ?? 'Invalid Key'}</div>;
    }
  };
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          {columns.map((column, index) => (
            <td key={index + index}>{render(row, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Table;