import { Formik, Form } from 'formik';
import { FunctionComponent, useContext } from 'react';
import Container from '../../../components/Container/Container';
import { CurrencyServiceContext } from '../../../services/currency-service/context/CurrencyServiceContext';
import { useCreateCustomerPage } from './create-customer-page-state/useCreateCustomerPage';
import { createCustomerValidationSchema } from './create-customer-page-state/CreateCustomerPageForm';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { pageStyle } from '../../../utils/utils';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Divider from '../../../components/Divider/Divider';
import Gap from '../../../components/Gap/Gap';

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
    <Container className="is-fullheight" style={pageStyle}>
      <PageHeader pageTitle="إضافة عميل">
        <Divider />
      </PageHeader>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnFormSubmit}
        validationSchema={createCustomerValidationSchema}
        validate={(values) => {
          if (values.currency) return;
          return { currency: 'اختر العملة' };
        }}
      >
        {(formik) => (
          <Form className="column is-6">
            <Input
              id="fullName"
              name="fullName"
              label="اسم العميل"
              placeholder="اسم العميل"
              errors={formik.errors}
              maxLength={56}
            />
            <Gap vertical={16} />
            <Input
              id="phone"
              name="phone"
              label="رقم هاتف العميل"
              placeholder="رقم هاتف العميل"
              errors={formik.errors}
              maxLength={56}
              minLength={10}
              className="mt-2"
            />
            <Gap vertical={16} />

            {state.currencies.length > 0 && (
              <div className="mt-2">
                <label htmlFor="currency" className="label">
                  اختر العملة
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
                      {'اختر العملة'}
                    </span>
                  </div>
                )}
                <Gap vertical={32} />

                <Button
                  text="إضافة"
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
