import React from 'react';
interface DivderProps extends React.AllHTMLAttributes<HTMLDivElement> {
  height?: number | string;
  width?: number | string;
  backgroundColor?: string;
}

const Divder: React.FunctionComponent<DivderProps> = ({
  height,
  width,
  backgroundColor,
  ...rest
}) => {
  return (
    <div
      style={{
        height: height ?? 0.5,
        backgroundColor: backgroundColor ?? '#DBDBDB',
        width: width ?? width,
      }}
      {...rest}
    ></div>
  );
};

export default Divder;
