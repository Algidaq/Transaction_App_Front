import { FunctionComponent, useContext } from 'react';
import Container from '../../components/Container/Container';
import { useCreateUserPageState } from './create-user-page-state/UseCreateUserPage';
import { UserRoleServiceContext } from '../../services/user-role-service/UserRoleServiceContext';
import { Form, Formik } from 'formik';
import Input from '../../components/Input/Input';
import { createUserValidationSchema } from './create-user-page-state/CreateUserPageForm';
import Button from '../../components/Button/Button';
import { UserServiceContext } from '../../services/user-service/context/UserServiceContext';

interface CreateUserPageProps {}

export const CreateUserPage: FunctionComponent<CreateUserPageProps> = () => {
  const service = useContext(UserRoleServiceContext);
  const userService = useContext(UserServiceContext);
  const { state, initialValues, handleFormSubmit, handleOnRoleChange } =
    useCreateUserPageState({
      roleService: service!,
      userService: userService!,
    });
  return (
    <Container>
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
          <Form className="column is-6">
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
            <div className="my-2">
              <label htmlFor="role" className=" label has-text-weight-semibold">
                Select User Role
              </label>

              <select
                id="role"
                name="role"
                className="input select is-fullwidth"
                // value={formik.values.role?.id}
                onChange={(e) => {
                  const role = handleOnRoleChange(e);
                  if (!role) return;
                  formik.setFieldValue('role', role);
                }}
              >
                {state.roles.map((role) => (
                  <option value={role.id} key={role.id}>
                    {role.role}
                  </option>
                ))}
              </select>
              {formik.errors.role && (
                <div>
                  <span className="has-text-danger is-size-7">
                    {'Role is Required'}
                  </span>
                </div>
              )}
            </div>
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
    </Container>
  );
};

export default CreateUserPage;
