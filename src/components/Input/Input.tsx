import * as React from 'react';
import { ErrorMessage, Field, FormikErrors } from 'formik';
import { BulmaSizes, ColorState, TextWeight } from '../../types/bulma.styles';
import './Input.scss';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  color?: ColorState;
  elementSize?: BulmaSizes;
  fontWeight?: TextWeight;
  errors?: FormikErrors<any>;
  id: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  label,
  id,
  name,
  color = 'is-primary',
  elementSize = 'is-normal',
  fontWeight = 'has-text-weight-semibold',
  className,
  errors,
  type,
  ...rest
}: InputProps) => {
  const elementColor: ColorState = errors && errors[name] ? 'is-danger' : color;
  const classes = `input ${elementColor} ${elementSize}`;
  const [hidePassword, setPassword] = React.useState<boolean>(
    type === 'password'
  );
  const handleTogglePassword = () => setPassword((state) => !state);
  let inputType = type;
  if (type === 'password' && !hidePassword) {
    inputType = 'text';
  } else if (type === 'password' && hidePassword) {
    inputType = 'password';
  } else {
    inputType = type;
  }
  return (
    <div className={className}>
      <label htmlFor={id} className={`${fontWeight} label`}>
        {label}
      </label>
      <div className="relative">
        <Field name={name} {...rest} className={classes} type={inputType} />
        {type === 'password' && (
          <button
            className="tr-trailing-input"
            onClick={(e) => {
              e.preventDefault();
              handleTogglePassword();
            }}
          >
            {hidePassword ? 'Show'.toUpperCase() : 'HIDE'}
          </button>
        )}
      </div>
      <ErrorMessage name={name}>
        {(msg) => (
          <div>
            <span className="is-size-7  has-text-danger"> {msg}</span>
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default Input;
