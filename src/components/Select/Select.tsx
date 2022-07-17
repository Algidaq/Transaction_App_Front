import { FormikErrors } from 'formik';
interface SelectProps<T> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: T[];
  valueKey: keyof T;
  renderContent: (item: T) => React.ReactNode | string;
  errors: FormikErrors<any>;
  errorText?: string;
  labelText?: string;
  firstOptionText?: string;
}

const Select = ({
  options,
  valueKey,
  value,
  labelText,
  firstOptionText,
  name,
  errors,
  errorText,
  renderContent,
  onChange,
  ...rest
}: SelectProps<any>) => {
  return (
    <div className="is-fullwidth">
      <label htmlFor="fromAccount" className="label has-text-weight-semibold">
        {labelText ?? `Select Field`}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="select is-block is-fullwidth"
        {...rest}
      >
        {firstOptionText && <option>{firstOptionText}</option>}
        {options.map((option, index) => {
          return (
            <option key={index} value={option[valueKey] ?? ''}>
              {renderContent(option)}
            </option>
          );
        })}
      </select>

      {errors[name ?? 'data'] && (
        <div>
          <span className="is-size-6 has-text-danger">
            {errorText ?? 'Field is required'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Select;
