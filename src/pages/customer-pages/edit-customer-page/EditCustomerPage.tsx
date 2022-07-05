import { Formik, Form } from 'formik';
import { useContext } from 'react';
import Divder from '../../../components/Divider/Divider';
import PageHeader from '../../../components/PageHeader/PageHeader';
import StateContainer from '../../../components/StateContainer/StateContainer';
import { CustomerServiceContext } from '../../../services/customer-service/context/CustomerServiceContext';
import { useEditCustomerPage } from './state/useEditCustomerPageState';
import { customerEditSchema } from './state/EditCustomerPageState';
import Input from '../../../components/Input/Input';
import Gap from '../../../components/Gap/Gap';
import Button from '../../../components/Button/Button';
import { pageStyle } from '../../../utils/utils';

interface EditCustomerPageProps {}

const EditCustomerPage: React.FunctionComponent<EditCustomerPageProps> = () => {
  const service = useContext(CustomerServiceContext)!;
  const viewmodel = useEditCustomerPage({ service });
  const renderHeader = () => {
    return (
      <PageHeader
        pageTitle={`تحديث بينات المستخدم ${
          viewmodel.state.customer?.name ?? ''
        }`}
      >
        <Divder />
      </PageHeader>
    );
  };
  return (
    <StateContainer
      state={viewmodel.state}
      onError={viewmodel.loadCustomer}
      onReloadClick={viewmodel.loadCustomer}
      renderHeader={renderHeader}
      style={pageStyle}
    >
      <Formik
        initialValues={viewmodel.initialValues}
        onSubmit={viewmodel.handleFormSubmit}
        validationSchema={customerEditSchema}
      >
        {(formik) => {
          return (
            <Form
              className="column is-6"
              onKeyUp={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                id="fullName"
                name="fullName"
                type="text"
                label="إسم العميل"
                // placeholder="Enter Customer Name"
                errors={formik.errors}
              />
              <Gap vertical={16} />
              <Input
                id="phone"
                name="phone"
                type="text"
                label="رقم هاتف العميل"
                // placeholder="Enter Customer Phone"
                errors={formik.errors}
              />
              <Gap vertical={24} />
              <Button
                text="تحدييث البيانات"
                state={viewmodel.state.formState}
                disabled={!(formik.isValid || formik.dirty)}
                type="submit"
              />
            </Form>
          );
        }}
      </Formik>
    </StateContainer>
  );
};

export default EditCustomerPage;
