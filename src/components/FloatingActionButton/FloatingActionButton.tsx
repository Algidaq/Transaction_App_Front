import React from 'react';
import './FloatingActionButton.scss';
import { Link, To } from 'react-router-dom';
interface FloatingActionButtonProps {
  text?: string;
  to: To;
}

const FloatingActionButton: React.FunctionComponent<
  FloatingActionButtonProps
> = ({ text, to, ...rest }) => {
  return (
    <Link to={to} {...rest} className="floating-action-button">
      {text ?? '+'}
    </Link>
  );
};

export default FloatingActionButton;
