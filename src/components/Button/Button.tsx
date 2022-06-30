import * as React from 'react';
import { StateEnum } from '../../enums/StateEnum';
import { ColorConstract, ColorState } from '../../types/bulma.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state?: StateEnum;
  color?: ColorState;
  contrast?: ColorConstract;
  text: string;
  outlined?: boolean;
  textButton?: boolean;
  isFullWidth?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  state = StateEnum.idel,
  color = 'is-primary',
  contrast,
  outlined,
  textButton,
  isFullWidth,
  className,
  text,
  ...rest
}) => {
  const classes = `button ${color} ${className ?? ''} 
   ${outlined === true ? 'is-outlined' : ''}
   ${textButton === true ? 'is-inverted' : ''} 
   ${StateEnum.isBusy(state) ? 'is-loading' : ''}
    ${contrast ?? ''}
   `;
  return (
    <button className={classes.trim()} {...rest}>
      {text.toUpperCase()}
    </button>
  );
};

export default Button;
