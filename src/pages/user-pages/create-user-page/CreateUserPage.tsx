import { FunctionComponent, useContext } from 'react';
import Container from '../../../components/Container/Container';

import { UserRoleServiceContext } from '../../../services/user-role-service/UserRoleServiceContext';
import { Form, Formik } from 'formik';
import Input from '../../../components/Input/Input';
import { createUserValidationSchema } from './create-user-page-state/CreateUserPageForm';
import Button from '../../../components/Button/Button';
import { UserServiceContext } from '../../../services/user-service/context/UserServiceContext';
import { useCreateUserPageState } from './create-user-page-state/useCreateUserPage';
import StateContainer from '../../../components/StateContainer/StateContainer';
import Divder from '../../../components/Divider/Divider';
import Gap from '../../../components/Gap/Gap';
import Select from '../../../components/Select/Select';

interface CreateUserPageProps {}

export const CreateUserPage: FunctionComponent<CreateUserPageProps> = () => {
  const service = useContext(UserRoleServiceContext);
  const userService = useContext(UserServiceContext);
  const {
    state,
    initialValues,
    handleFormSubmit,
    handleOnRoleChange,
    loadUserRoles,
  } = useCreateUserPageState({
    roleService: service!,
    userService: userService!,
  });
  const renderOnError = (): React.ReactNode => {
    return (
      <div className="is-fullheight is-fullwidth flex-center">
        <Button text="Reload" onClick={loadUserRoles} />
      </div>
    );
  };
  const renderHeader = () => {
    return (
      <header className="p-3">
        <Gap vertical={8} />
        <h6>Add New User</h6>
        <Gap vertical={16} />
        <Divder />
      </header>
    );
  };
  return (
    <StateContainer
      state={state}
      renderOnError={renderOnError}
      style={{
        backgroundColor: 'white',
        margin: '8px 0px',
        borderRadius: '8px',
      }}
      renderHeader={renderHeader}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={createUserValidationSchema}
        validate={(values) => {
          if (values.password === values.confirmPassword) return;
          return {
            confirmPassword: 'Confirm Password must match password',
            role: values.role === undefined ? 'User Role is required' : '',
          };
        }}
      >
        {(formik) => (
          <Form
            className="column is-6 px-5"
            onKeyUp={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          >
            <Input
              id="fullName"
              name="fullName"
              errors={formik.errors}
              label="Full Name"
              placeholder="Enter FullName"
              maxLength={56}
              type="text"
            />
            <Input
              id="phone"
              name="phone"
              label="Phone number"
              placeholder="Enter Phone number"
              maxLength={56}
              inputMode="numeric"
              type="tel"
              className="my-2"
            />
            <Select
              labelText="Select User Role"
              id="role"
              name="role"
              onChange={(e) => handleOnRoleChange(formik, e.target.value)}
              onClick={(e) => {
                if (state.roles.length === 1) {
                  handleOnRoleChange(formik, e.currentTarget.value);
                }
              }}
              value={state.selectedRole?.id}
              valueKey={'id'}
              options={state.roles}
              errors={formik.errors}
              renderContent={(role) => role.role}
            />

            <Input
              id="password"
              name="password"
              placeholder="Enter user password"
              label="Password"
              type="password"
              className="my-2"
              errors={formik.errors}
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Retype password"
              label="Confrim Password"
              type="password"
              className="my-2"
              errors={formik.errors}
            />
            <Button
              text="Create User"
              state={state.stateEnum}
              type="submit"
              className="mt-3"
              style={{ width: 200 }}
              disabled={!(formik.isValid && formik.dirty)}
            />
          </Form>
        )}
      </Formik>
    </StateContainer>
  );
};

export default CreateUserPage;
