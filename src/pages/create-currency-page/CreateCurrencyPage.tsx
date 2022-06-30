import React from 'react';
import Container from '../../components/Container/Container';
import { useCreateCurrencyPage } from './create-currency-page-state/useCreateCurrencyPage';
import { useContext } from 'react';
import { CurrencyServiceContext } from '../../services/currency-service/context/CurrencyServiceContext';
import { Form, Formik } from 'formik';
import { createCurrencyValidateSchema } from './create-currency-page-state/CreateCurrencyPageForm';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

interface CreateCurrencyPageProps {}

const CreateCurrencyPage: React.FunctionComponent<
  CreateCurrencyPageProps
> = () => {
  const service = useContext(CurrencyServiceContext)!;
  const { state, initialValues, handleOnFormSubmit } = useCreateCurrencyPage({
    service,
  });
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnFormSubmit}
        validationSchema={createCurrencyValidateSchema}
      >
        {(formik) => (
          <Form className="column is-6">
            <Input
              id="name"
              name="name"
              label="Currency Name"
              placeholder="Enter Currency Name"
              errors={formik.errors}
              type="text"
              maxLength={56}
            />
            <Input
              id="symbol"
              name="symbol"
              label="Currency Symbol"
              placeholder="Enter Currency Symbol eg. $"
              errors={formik.errors}
              type="text"
              maxLength={56}
              className="my-2"
            />
            <Button
              text="Add New Currency"
              state={state.stateEnum}
              className="mt-3"
              style={{ minWidth: 200, maxWidth: 254 }}
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateCurrencyPage;
