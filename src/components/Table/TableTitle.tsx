import Gap from '../Gap/Gap';
import React from 'react';
interface TableTitleProps extends React.AllHTMLAttributes<HTMLDivElement> {
  title: string;
  verticalGap?: number;
}

const TableTitle: React.FunctionComponent<TableTitleProps> = ({
  title,
  verticalGap,
  ...rest
}) => {
  return (
    <div style={{ backgroundColor: 'white' }} {...rest}>
      <h6 className="has-text-weight-semibold p-3">{title}</h6>
      <Gap vertical={verticalGap ?? 36} />
    </div>
  );
};

export default TableTitle;
