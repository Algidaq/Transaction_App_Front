import { FunctionComponent, useContext } from 'react';
import { CreateRolePageProps } from './CreateRoleProps';
import { useCreateRoleForm } from './UseCreateRoleForm';
import { Form, Formik } from 'formik';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { roleValidationScheam } from './UserRoleForm';
import { ToastContainer } from 'react-toastify';
import { UserRoleServiceContext } from '../../../services/user-role-service/UserRoleServiceContext';
import { pageStyle } from '../../../utils/utils';
import PageHeader from '../../../components/PageHeader/PageHeader';
import Divder from '../../../components/Divider/Divider';

const CreateRolePage: FunctionComponent<CreateRolePageProps> = () => {
  const service = useContext(UserRoleServiceContext);
  const { initialValues, handleFormSubmit, state } = useCreateRoleForm(
    service!
  );
  return (
    <div className="container is-fullheight" style={pageStyle}>
      <PageHeader pageTitle="Add User Roles">
        <Divder />
      </PageHeader>
      <div className="column is-6">
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={roleValidationScheam}
          validateOnMount={true}
        >
          {({ errors, isValid, dirty }) => (
            <Form>
              <Input
                id="role"
                name="role"
                label="Role"
                placeholder="Enter User Role"
                errors={errors}
              />
              <Button
                text="Create Role"
                className="my-4"
                disabled={!(isValid && dirty)}
                state={state.stateEnum}
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateRolePage;
