import { Formik, Form } from 'formik';
import { FunctionComponent, useContext } from 'react';
import Container from '../../../components/Container/Container';
import { CurrencyServiceContext } from '../../../services/currency-service/context/CurrencyServiceContext';
import { useCreateCustomerPage } from './create-customer-page-state/useCreateCustomerPage';
import { createCustomerValidationSchema } from './create-customer-page-state/CreateCustomerPageForm';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';

interface CreateCustomerPageProps {}

const CreateCustomerPage: FunctionComponent<CreateCustomerPageProps> = () => {
  const currencyService = useContext(CurrencyServiceContext)!;
  const customerService = useContext(CustomerServiceContext)!;
  const {
    state,
    initialValues,
    handleOnFormSubmit,
    handleOnCurrencySelectionChange,
  } = useCreateCustomerPage({
    currencyService,
    customerService,
  });
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnFormSubmit}
        validationSchema={createCustomerValidationSchema}
        validate={(values) => {
          if (values.currency) return;
          return { currency: 'Currency is Required' };
        }}
      >
        {(formik) => (
          <Form className="column is-6">
            <Input
              id="fullName"
              name="fullName"
              label="Customer Name"
              placeholder="Enter Customer Name"
              errors={formik.errors}
              maxLength={56}
            />
            <Input
              id="phone"
              name="phone"
              label="Customer Phone"
              placeholder="Enter Customer Phone"
              errors={formik.errors}
              maxLength={56}
              minLength={10}
              className="mt-2"
            />
            {state.currencies.length > 0 && (
              <div className="mt-2">
                <label htmlFor="currency" className="label">
                  Select Customer Currency
                </label>
                <select
                  name="currency"
                  id="currency"
                  className="input select"
                  value={formik.values.currency?.id}
                  onChange={(e) => handleOnCurrencySelectionChange(e, formik)}
                >
                  {state.currencies.map((currency) => (
                    <option value={currency.id} key={currency.id}>
                      {currency.name + ' ' + currency.symbol}
                    </option>
                  ))}
                </select>
                {formik.errors.currency && (
                  <div className="mt-1">
                    <span className="has-text-danger is-size-7">
                      Currency is Required
                    </span>
                  </div>
                )}
                <Button
                  text="Create Customer"
                  state={state.stateEnum}
                  type="submit"
                  style={{ width: 200, marginTop: 16 }}
                  disabled={!(formik.isValid && formik.dirty)}
                />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateCustomerPage;
