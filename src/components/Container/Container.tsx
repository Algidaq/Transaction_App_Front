import * as React from 'react';

interface ContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {}

export const Container: React.FunctionComponent<ContainerProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={`container ${className ?? ''}`} {...rest}>
      {children}
    </div>
  );
};

export default Container;
