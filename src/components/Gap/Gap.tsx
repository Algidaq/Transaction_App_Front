import * as React from 'react';
interface GapProps extends React.AllHTMLAttributes<HTMLDivElement> {
  horizontal?: number | string;
  vertical?: number | string;
}

const Gap: React.FunctionComponent<GapProps> = ({
  horizontal,
  vertical,
  ...rest
}) => {
  return <div style={{ height: vertical, width: horizontal }} {...rest} />;
};

export default Gap;
