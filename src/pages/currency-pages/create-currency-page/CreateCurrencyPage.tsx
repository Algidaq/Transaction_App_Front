import React from 'react';
import Container from '../../../components/Container/Container';
import { useCreateCurrencyPage } from './create-currency-page-state/useCreateCurrencyPage';
import { useContext } from 'react';
import { CurrencyServiceContext } from '../../../services/currency-service/context/CurrencyServiceContext';
import { Form, Formik } from 'formik';
import { createCurrencyValidateSchema } from './create-currency-page-state/CreateCurrencyPageForm';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { pageStyle } from '../../../utils/utils';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Divider from '../../../components/Divider/Divider';
import Gap from '../../../components/Gap/Gap';

interface CreateCurrencyPageProps {}

const CreateCurrencyPage: React.FunctionComponent<
  CreateCurrencyPageProps
> = () => {
  const service = useContext(CurrencyServiceContext)!;
  const { state, initialValues, handleOnFormSubmit } = useCreateCurrencyPage({
    service,
  });
  return (
    <Container className="is-fullheight" style={pageStyle}>
      <PageHeader pageTitle="Currency List">
        <Divider />
        <Gap vertical={16} />
      </PageHeader>
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
              label="إسم العملة"
              placeholder="ادخل إسم العملة"
              errors={formik.errors}
              type="text"
              maxLength={56}
            />
            <Input
              id="symbol"
              name="symbol"
              label="رمز العملة"
              placeholder="ادخل رمز العملة"
              errors={formik.errors}
              type="text"
              maxLength={56}
              className="my-2"
            />
            <Button
              text="إضافة"
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
